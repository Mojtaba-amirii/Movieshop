"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Trash2, ShoppingBasket } from "lucide-react";

import type { ReduxState } from "~/redux/store";
import { useDispatch, useSelector } from "~/redux/store";
import { removeItem, clearCart } from "~/redux/cartSlice";

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
      <div className="container mx-auto px-4 py-12">
        <div className="animate-scale-in mx-auto max-w-md text-center">
          <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br from-blue-100 to-purple-100">
            <ShoppingBasket className="h-12 w-12 text-gray-400" />
          </div>
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            Your Cart is Empty
          </h1>
          <p className="mb-8 text-gray-600">
            Add some movies to your cart to get started!
          </p>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-purple-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            Browse Movies
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-slide-up container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="mt-1 text-gray-600">
            {cartItems.length} items in your cart
          </p>
        </div>
        <button
          type="button"
          onClick={handleClearCart}
          className="rounded-lg px-4 py-2 text-sm font-semibold text-red-600 transition-colors duration-200 hover:bg-red-50"
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
                className="group flex gap-4 rounded-2xl border-2 border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-lg"
              >
                <div className="relative h-32 w-24 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={item.poster ?? "/imgs/image-not-found.jpg"}
                    alt={item.title}
                    fill
                    sizes="96px"
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {item.genres.slice(0, 3).join(", ")}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-green-600">
                      {item.price ?? 0} kr
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      className="rounded-lg p-2 text-red-500 transition-colors duration-200 hover:bg-red-50"
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
          <div className="sticky top-24 rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-lg">
            <h2 className="mb-6 text-xl font-bold text-gray-900">
              Order Summary
            </h2>
            <div className="space-y-3 border-b-2 border-gray-200 pb-4">
              <div className="flex justify-between text-gray-600">
                <span>Items ({cartItems.length})</span>
                <span className="font-semibold">
                  {totalPrice.toFixed(2)} kr
                </span>
              </div>
            </div>
            <div className="mt-4 flex justify-between text-2xl font-bold text-gray-900">
              <span>Total</span>
              <span className="text-green-600">{totalPrice.toFixed(2)} kr</span>
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              className="mt-6 w-full rounded-xl bg-linear-to-r from-blue-600 to-purple-600 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Proceed to Checkout
            </button>
            <button
              type="button"
              onClick={() => router.push("/")}
              className="mt-3 w-full rounded-xl border-2 border-gray-200 py-4 font-semibold text-gray-700 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
