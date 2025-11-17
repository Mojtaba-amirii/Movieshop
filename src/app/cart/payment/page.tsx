"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "~/redux/store";
import type { ReduxState } from "~/redux/store";

export default function PaymentPage() {
  const router = useRouter();
  const cartItems = useSelector((state: ReduxState) => state.cart.items);
  const totalPrice = cartItems.reduce(
    (total: number, item) => total + (item.price ?? 0),
    0,
  );

  if (cartItems.length === 0) {
    router.push("/cart");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement Stripe payment
    router.push("/cart/confirm");
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Payment</h1>

      <div className="mb-6 rounded-lg border p-4">
        <h2 className="mb-2 text-xl font-semibold">Order Summary</h2>
        <p className="text-gray-600">
          {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
        </p>
        <p className="text-2xl font-bold text-green-600">
          Total: {totalPrice.toFixed(2)} kr
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium">
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            placeholder="1234 5678 9012 3456"
            className="mt-1 w-full rounded-md border p-2"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="expiry" className="block text-sm font-medium">
              Expiry Date
            </label>
            <input
              type="text"
              id="expiry"
              placeholder="MM/YY"
              className="mt-1 w-full rounded-md border p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="cvc" className="block text-sm font-medium">
              CVC
            </label>
            <input
              type="text"
              id="cvc"
              placeholder="123"
              className="mt-1 w-full rounded-md border p-2"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-blue-500 py-3 text-white hover:bg-blue-600"
        >
          Pay {totalPrice.toFixed(2)} kr
        </button>

        <button
          type="button"
          onClick={() => router.push("/cart")}
          className="w-full rounded-md border py-3 hover:bg-gray-50"
        >
          Back to Cart
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-500">
        This is a demo page. Stripe integration coming soon.
      </p>
    </div>
  );
}
