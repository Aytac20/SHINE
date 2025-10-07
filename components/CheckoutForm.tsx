"use client";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "./ui/card";
import { Button } from "./ui/button";
import { FormEvent, useState } from "react";
type CheckoutFormProps = {
  amount: number;
  clientSecret: string;
};
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);
const CheckoutForm = ({ amount, clientSecret }: CheckoutFormProps) => {
  return (
    <div className='mx-auto w-full max-w-5xl'>
      <Elements options={{ clientSecret }} stripe={stripePromise}>
        <Form amount={amount} />
      </Elements>
    </div>
  );
};

export default CheckoutForm;
function Form({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (stripe == null || elements == null) return;
    setIsLoading(true);
    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/purchase-success`,
        },
      })
      .then(({ error }) => {
        if (error.type === "card_error" || error.type === "validation_error") {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("An unknown error occured");
        }
      })
      .finally(() => setIsLoading(false));
  }
  return (
    <form onSubmit={handleSubmit}>
      <Card className='border-none shadow-none'>
        <h2 className='flex items-center pl-6 text-xl tracking-wider text-zinc-700'>
          Checkout
        </h2>
        <CardHeader>
          {errorMessage && <CardDescription>{errorMessage}</CardDescription>}
        </CardHeader>
        <CardContent>
          <PaymentElement />
        </CardContent>
        <CardFooter>
          <Button
            className='w-full rounded-none bg-black text-white'
            type='submit'
            size='lg'
            disabled={stripe == null || elements == null || isLoading}
          >
            {isLoading ? "Purchasing..." : `Purchase $${amount}`}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
