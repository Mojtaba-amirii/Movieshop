"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "~/redux/store";
import { clearCart } from "~/redux/cartSlice";
import { CheckCircle } from "lucide-react";

export default function PaymentConfirmPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear cart after successful payment
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12 text-center">
      <div className="mb-6 flex justify-center">
        <CheckCircle size={80} className="text-green-500" />
      </div>

      <h1 className="mb-4 text-3xl font-bold text-green-600">
        Payment Successful!
      </h1>

      <p className="mb-2 text-xl">Thank you for your purchase!</p>
      <p className="mb-8 text-gray-600">
        Your movies have been added to your library.
      </p>

      <div className="space-y-3">
        <button
          onClick={() => router.push("/my-movies")}
          className="w-full max-w-sm rounded-md bg-blue-500 py-3 text-white hover:bg-blue-600"
        >
          View My Movies
        </button>

        <button
          onClick={() => router.push("/")}
          className="w-full max-w-sm rounded-md border py-3 hover:bg-gray-50"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
