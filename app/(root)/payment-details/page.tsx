export const dynamic = "force-dynamic";
import CheckoutPage from "@/components/CheckoutPage";
import { getUser } from "@/lib/actions/cart.actions";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Select Payment Method",
};
const PaymentDetailsPage = async () => {
  const user = await getUser();
  const cart = await prisma.cart.findUnique({
    where: { userId: user.id },
    include: { cartItems: true },
  });

  if (!cart || cart.cartItems.length === 0) redirect("/cart");
  if (!cart) {
    return <div>Your cart is empty.</div>;
  }

  return <CheckoutPage amount={cart.totalPrice} />;
};

export default PaymentDetailsPage;
