"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const PayPage = () => {
  const router = useRouter();
//   const { courseId, price } = router.query;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Complete your purchase</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm  price={10} />
      </Elements>
    </div>
  );
};

export default PayPage;
