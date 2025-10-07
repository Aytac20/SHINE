import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUser, getMyCart } from "@/lib/actions/cart.actions";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) throw new Error("Not authenticated");

    const user = await getUser();
    const cart = await getMyCart();

    if (!cart || cart.cartItems.length === 0) {
      return NextResponse.json({ success: false, message: "Cart is empty" });
    }

    if (!user.addresses || user.addresses.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No shipping address",
      });
    }

    const shippingAddress =
      user.addresses.find((a) => a.isDefault) || user.addresses[0];

    const insertedOrder = await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId: user.id,
          addressId: shippingAddress.id,
          paymentMethod: user.paymentMethod || "CARD",
          itemsPrice: cart.itemsPrice,
          totalAmount: cart.totalPrice,
          taxPrice: cart.taxPrice,
          shippingPrice: cart.shippingPrice,
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

      for (const item of cart.cartItems) {
        await tx.productVariant.updateMany({
          where: { productId: item.product.id, size: item.size },
          data: { stock: { decrement: item.quantity } },
        });
      }

      await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
      await tx.cart.update({
        where: { id: cart.id },
        data: { itemsPrice: 0, totalPrice: 0, shippingPrice: 0, taxPrice: 0 },
      });

      return order;
    });

    return NextResponse.json({ success: true, orderId: insertedOrder.id });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
