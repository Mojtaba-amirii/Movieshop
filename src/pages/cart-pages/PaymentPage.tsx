import React, { useState, useEffect } from "react";
import { X, CreditCard } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import type { Movie } from "~/types/types";
import { useSelector, useDispatch } from "~/redux/store";
import { removeItem, clearCart } from "~/redux/cartSlice";
import { api } from "~/utils/api";
import { getStripe } from "~/libs/stripe";

interface CheckoutFormProps {
  totalPrice: number;
  handlePurchase: () => void;
}

function CheckoutForm({ totalPrice, handlePurchase }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        setError(error.message ?? "An unknown error occurred");
        setProcessing(false);
      } else {
        //send the paymentMethod.id to server
        console.log("PaymentMethod:", paymentMethod);
        handlePurchase();
        setProcessing(false);
      }
    } else {
      setError("Card element not found");
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="rounded-md shadow-sm">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
          className="rounded-md border border-gray-300 px-3 py-2"
          onChange={(event) => {
            if (event.error) {
              setError(event.error.message);
            } else {
              setError(null);
            }
          }}
        />
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
      >
        {processing ? "Processing..." : `Pay ${totalPrice} kr`}
      </button>
    </form>
  );
}

export default function PaymentPage() {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const cartMovies = useSelector((state) => state.cart.items);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const addPurchasedMovie = api.user.addPurchasedMovie.useMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!sessionData) {
      void router.push("/");
    }
  }, [router, sessionData]);

  useEffect(() => {
    const totalPrice = cartMovies.reduce(
      (acc: number, movie: Movie) => acc + (movie.price ?? 0),
      0,
    );
    setTotalPrice(totalPrice);
  }, [cartMovies]);

  const removeMovieFromCart = (movie: Movie) => {
    dispatch(removeItem(movie));
  };

  const handlePurchase = () => {
    if (sessionData?.user?.id) {
      addPurchasedMovie.mutate({
        userId: sessionData.user.id,
        movieId: cartMovies.map((movie) => movie.id),
      });
      dispatch(clearCart());
      void router.push("/cart-pages/PayConfirm");
    }
  };

  return (
    <div className="mx-auto my-10 max-w-4xl p-4">
      <h1 className="mb-8 text-center text-3xl font-bold">Checkout</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-xl font-semibold">Your Cart</h2>
          <ul className="space-y-4">
            {cartMovies.map((movie, index) => (
              <li
                key={index}
                className="flex items-center space-x-4 rounded-lg bg-gray-100 p-4"
              >
                <Image
                  src={movie.poster ?? "/imgs/image-not-found.jpg"}
                  alt={movie.title}
                  width={48}
                  height={72}
                  className="rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{movie.title}</h3>
                  <p className="text-sm text-gray-600">{`${movie.price} kr`}</p>
                </div>
                <button
                  type="button"
                  title="Remove from cart"
                  onClick={() => removeMovieFromCart(movie)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-right text-xl font-semibold">
            Total: {totalPrice} kr
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-xl font-semibold">Payment Details</h2>
          <Elements stripe={getStripe()}>
            <CheckoutForm
              totalPrice={totalPrice}
              handlePurchase={handlePurchase}
            />
          </Elements>
          <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
            <CreditCard className="mr-2 h-5 w-5" />
            <p>Payments are secure and encrypted</p>
          </div>
        </div>
      </div>
    </div>
  );
}
