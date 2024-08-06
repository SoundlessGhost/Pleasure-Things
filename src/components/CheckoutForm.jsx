// components/CheckoutForm.js
import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ courseId, price }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { data: clientSecret } = await axios.post("/api/create-payment-intent", {
      amount: price * 100, // Amount in cents
    });

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      console.error(error);
    } else if (paymentIntent.status === "succeeded") {
      console.log("Payment successful!");
      // Handle successful payment here (e.g., enroll the user in the course)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className="p-2 border rounded-md" />
      <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded-md" disabled={!stripe}>
        Pay ${price}
      </button>
    </form>
  );
};

export default CheckoutForm;
