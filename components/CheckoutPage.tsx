"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import convertToSubcurrency from "@/lib/utils";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);
const CheckoutPage = ({ amount }: { amount: number }) => {
  return (
    <div className='mx-auto w-full max-w-5xl'>
      <Elements
        options={{
          mode: "payment",
          currency: "usd",
          amount: convertToSubcurrency(amount),
        }}
        stripe={stripePromise}
      >
        <CheckoutForm amount={amount} />
      </Elements>
    </div>
  );
};

export default CheckoutPage;
