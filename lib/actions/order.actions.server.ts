
export const dynamic = "force-dynamic";
import { getServerSession } from "next-auth";
import { getMyCart, getUser } from "./cart.actions";
import prisma from "../prisma";
import { Prisma } from "@prisma/client";
import { authOptions } from "../auth";

export async function createOrderServer() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error("Not authenticated");

  const user = await getUser();
  const cart = await getMyCart();
  if (!cart || cart.cartItems.length === 0) {
    throw new Error("Your cart is empty");
  }

  const shippingAddress =
    user.addresses.find((a) => a.isDefault) || user.addresses[0];
  if (!shippingAddress) throw new Error("No shipping address");

  const order = await prisma.$transaction(async (tx) => {
    const insertedOrder = await tx.order.create({
      data: {
        userId: user.id,
        addressId: shippingAddress.id,
        paymentMethod: user.paymentMethod || "CARD",
        itemsPrice: new Prisma.Decimal(cart.itemsPrice.toFixed(2)),
        totalAmount: new Prisma.Decimal(cart.totalPrice.toFixed(2)),
        taxPrice: new Prisma.Decimal(cart.taxPrice.toFixed(2)),
        shippingPrice: new Prisma.Decimal(cart.shippingPrice.toFixed(2)),
        status: "PENDING",
        items: {
          create: cart.cartItems.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
            price: item.price,
            name: item.product.name,
            description: item.product.description || "",
            image: item.product.images[0]?.url || "",
            size: item.size || "",
          })),
        },
      },
    });

    // Stock update
    for (const item of cart.cartItems) {
      await tx.productVariant.updateMany({
        where: {
          productId: item.product.id,
          size: item.size,
          color: item.color || null,
        },
        data: { stock: { decrement: item.quantity } },
      });
    }

    await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
    await tx.cart.update({
      where: { id: cart.id },
      data: { itemsPrice: 0, totalPrice: 0, shippingPrice: 0, taxPrice: 0 },
    });

    return insertedOrder;
  });

  return order;
}
