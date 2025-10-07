export const dynamic = "force-dynamic";
import CheckoutForm from "@/components/CheckoutForm";
import { getUser } from "@/lib/actions/cart.actions";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import React from "react";
import Stripe from "stripe";

export const metadata: Metadata = {
  title: "Select Payment Method",
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const PaymentDetailsPage = async () => {
  const user = await getUser();

  const cart = await prisma.cart.findUnique({
    where: { userId: user.id },
  });

  if (!cart) {
    return <div>Your cart is empty.</div>;
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(cart.totalPrice * 100), // in cents
    currency: "usd",
    payment_method_types: ["card"],
    metadata: { userId: user.id },
  });

  if (!paymentIntent.client_secret) {
    throw new Error("Stripe failed to create a payment intent");
  }

  return (
    <CheckoutForm
      amount={cart.totalPrice}
      clientSecret={paymentIntent.client_secret}
    />
  );
};

export default PaymentDetailsPage;
