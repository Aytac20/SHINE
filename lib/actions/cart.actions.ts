
'use server';
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { round2 } from "../utils";
import type { CartItem } from "@prisma/client";
import { redirect } from "next/navigation";
import { authOptions } from "../auth";


// ------------------- Helper: get user -------------------
export async function getUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login"); // works because this is server-side
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { cart: { include: { cartItems: true } }, addresses: true },
  });

  if (!user) throw new Error("User not found");
  return user;
}
// ------------------- Helper: calculate totals -------------------
export const calcPrice = async (items: CartItem[]) => {
  const itemsPrice = round2(
    items.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0)
  );

  let shippingPrice = 0;
  let taxPrice = 0;

  if (itemsPrice <= 1000) {
    shippingPrice = 15;
    taxPrice = itemsPrice * 0.08;
  } else if (itemsPrice <= 10000) {
    shippingPrice = 10;
    taxPrice = itemsPrice * 0.1;
  } else if (itemsPrice <= 30000) {
    shippingPrice = 5;
    taxPrice = itemsPrice * 0.12;
  } else {
    shippingPrice = 0;
    taxPrice = itemsPrice * 0.15;
  }

  shippingPrice = round2(shippingPrice);
  taxPrice = round2(taxPrice);
  const totalPrice = round2(itemsPrice + taxPrice + shippingPrice);

  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};

// ------------------- Add or update cart item -------------------
export async function addToCart(
  productId: string,
  quantity: number,
  size?: string | null,
  color?: string | null
) {
  const user = await getUser();

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw new Error("Product not found");

  // Ensure cart exists
  let cart = user.cart;
  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId: user.id },
      include: { cartItems: true },
    });
  }

  // Check if the item already exists (same product, size, color)
  const existingItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      productId,
      size: size ?? null,
      color: color ?? null,
    },
  });
  const variant = await prisma.productVariant.findFirst({
    where: {
      productId,
      size: size ?? null,
      color: color ?? null,
    },
  });
  if (!variant) throw new Error("Variant not found");

  if (variant.stock < quantity) {
    throw new Error(`Only ${variant.stock} left in stock`);
  }
  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: {
        quantity: existingItem.quantity + quantity,
        stock: variant.stock,
      },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
        size: size ?? null,
        color: color ?? null,
        price: product.price,
        stock: variant.stock,
      },
    });
  }

  return await refreshCart(cart.id);
}

// ------------------- Update cart item quantity -------------------
export async function updateCartItemQuantity(itemId: string, quantity: number) {
  const updatedItem = await prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity },
    include: { cart: { include: { cartItems: true } } },
  });

  return await refreshCart(updatedItem.cart.id);
}

// ------------------- Update cart item size -------------------
export async function updateCartItemSize(itemId: string, size: string) {
  // Find the cart item first
  const cartItem = await prisma.cartItem.findUnique({
    where: { id: itemId },
    include: { product: true },
  });

  if (!cartItem) throw new Error("Cart item not found");

  // Find the new variant for that product & size
  const variant = await prisma.productVariant.findFirst({
    where: {
      productId: cartItem.productId,
      size,
    },
  });

  if (!variant) throw new Error("Selected size not available");

  // Update cart item with the new size AND stock
  return prisma.cartItem.update({
    where: { id: itemId },
    data: {
      size,
      stock: variant.stock, // <-- sync the stock
    },
  });
}

// ------------------- Remove cart item -------------------
export async function removeCartItem(itemId: string) {
  const deletedItem = await prisma.cartItem.delete({
    where: { id: itemId },
    include: { cart: { include: { cartItems: true } } },
  });

  return await refreshCart(deletedItem.cart.id);
}

// ------------------- Refresh totals for cart -------------------
async function refreshCart(cartId: string) {
  const cart = await prisma.cart.findUnique({
    where: { id: cartId },
    include: {
      cartItems: {
        include: {
          product: {
            include: {
              images: true,
              variants: true,
              category: true,
              subCategory: true,
            },
          },
        },
      },
    },
  });

  if (!cart) throw new Error("Cart not found");

  const totals = await calcPrice(cart.cartItems);

  const finalCart = await prisma.cart.update({
    where: { id: cart.id },
    data: {
      itemsPrice: totals.itemsPrice,
      shippingPrice: totals.shippingPrice,
      taxPrice: totals.taxPrice,
      totalPrice: totals.totalPrice,
    },
    include: { cartItems: true },
  });

  return { finalCart, message: "Successfully added to cart" };
}

// ------------------- Get current user's cart -------------------
export async function getMyCart() {
  const user = await getUser();

  const cart = await prisma.cart.findFirst({
    where: { userId: user.id },
    include: {
      cartItems: {
        include: {
          product: {
            include: {
              images: true,
              variants: true,
              category: true,
              subCategory: true,
            },
          },
        },
      },
    },
  });

  return cart;
}
