"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { removeItem, clearCart } from "~/redux/cartSlice";
import { useDispatch, useSelector } from "~/redux/store";
import type { ReduxState } from "~/redux/store";

export default function CartPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: ReduxState) => state.cart.items);

  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.price ?? 0),
    0,
  );

  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    // TODO: Implement checkout flow
    router.push("/cart/payment");
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="mb-4 text-3xl font-bold">Your Cart is Empty</h1>
        <p className="mb-8 text-gray-600">
          Add some movies to your cart to get started!
        </p>
        <button
          onClick={() => router.push("/")}
          className="rounded-md bg-blue-500 px-6 py-3 text-white hover:bg-blue-600"
        >
          Browse Movies
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <button
          onClick={handleClearCart}
          className="text-red-500 hover:text-red-700"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 rounded-lg border p-4 shadow-sm"
              >
                <div className="relative h-32 w-24 shrink-0">
                  <Image
                    src={item.poster ?? "/imgs/image-not-found.jpg"}
                    alt={item.title}
                    fill
                    className="rounded object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-600">
                      {item.genres.slice(0, 3).join(", ")}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-green-600">
                      {item.price ?? 0} kr
                    </span>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                      title="Remove from cart"
                      aria-label="Remove from cart"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="rounded-lg border p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold">Order Summary</h2>
            <div className="space-y-2 border-b pb-4">
              <div className="flex justify-between">
                <span>Items ({cartItems.length})</span>
                <span>{totalPrice.toFixed(2)} kr</span>
              </div>
            </div>
            <div className="mt-4 flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>{totalPrice.toFixed(2)} kr</span>
            </div>
            <button
              onClick={handleCheckout}
              className="mt-6 w-full rounded-md bg-blue-500 py-3 text-white hover:bg-blue-600"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={() => router.push("/")}
              className="mt-2 w-full rounded-md border py-3 hover:bg-gray-50"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
