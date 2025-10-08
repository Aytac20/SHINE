"use client";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "./ui/card";
import { Button } from "./ui/button";
import { FormEvent, useEffect, useState } from "react";
import convertToSubcurrency from "@/lib/utils";
import Loading from "@/app/loading";

export default function CheckoutForm({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!stripe || !elements) return;
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setIsLoading(false);
      return;
    }
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/payment-success?amount=${amount}`,
      },
    });
    if (error) {
      setErrorMessage(error.message);
      setErrorMessage(error.message);
    } else {
      setIsLoading(false);
    }
  };
  if (!clientSecret || !stripe || !elements) {
    return <Loading />;
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
        <CardContent>{clientSecret && <PaymentElement />}</CardContent>
        <CardFooter>
          <Button
            className='w-full rounded-none bg-black text-white'
            type='submit'
            size='lg'
            disabled={!stripe || !elements || isLoading}
          >
            {isLoading ? "Purchasing..." : `Purchase $${amount}`}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
