import React, { useState, useEffect } from "react";
import { X, ShoppingBag, AlertCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "~/redux/store";
import type { Movie } from "~/types/types";
import { removeItem } from "~/redux/cartSlice";

export default function ShoppingCart() {
  const dispatch = useDispatch();
  const cartMovies = useSelector((state) => state.cart.items);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const removeMovieFromCart = (movie: Movie) => {
    dispatch(removeItem(movie.id));
  };

  useEffect(() => {
    const totalPrice = cartMovies.reduce(
      (acc: number, _movie: Movie) => acc + (_movie.price ?? 0),
      0,
    );
    setTotalPrice(totalPrice);
  }, [cartMovies]);

  return (
    <section className="mx-auto my-10 max-w-4xl p-4">
      <h1 className="mb-8 text-center text-3xl font-bold">
        Your Shopping Cart
      </h1>
      {cartMovies.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg bg-gray-100 p-8 text-center">
          <ShoppingBag className="mb-4 h-16 w-16 text-gray-400" />
          <p className="mb-4 text-xl font-semibold text-gray-600">
            Your cart is empty
          </p>
          <Link href="/">
            <button
              type="button"
              className="rounded-full bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600"
            >
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <>
          <ul className="mb-8 divide-y divide-gray-200">
            {cartMovies.map((_movie: Movie, index: number) => (
              <li key={index} className="flex items-center py-6">
                <Image
                  src={_movie?.poster ?? "/imgs/image-not-found.jpg"}
                  alt={_movie?.title}
                  width={80}
                  height={120}
                  priority
                  className="rounded-md object-cover"
                />
                <div className="ml-4 flex flex-1 flex-col">
                  <div className="flex justify-between">
                    <h2 className="text-lg font-medium text-gray-900">
                      {_movie?.title}
                    </h2>
                    <p className="text-lg font-medium text-gray-900">{`${_movie.price} kr`}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="mt-1 text-sm text-gray-500">
                      {_movie.genres.slice(0, 3).join(", ")}
                    </p>
                    <button
                      title="Remove"
                      type="button"
                      onClick={() => removeMovieFromCart(_movie)}
                      className="ml-4 text-red-400 hover:text-red-500"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="rounded-lg bg-gray-50 p-6">
            <div className="flex justify-between">
              <p className="text-lg font-medium text-gray-900">Total</p>
              <p className="text-lg font-medium text-gray-900">{`${totalPrice} kr`}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <Link href="/cart-pages/PaymentPage">
                <button
                  type="button"
                  className="w-full rounded-full bg-blue-500 px-6 py-3 text-center text-base font-medium text-white shadow-xs transition-colors hover:bg-blue-600"
                >
                  Proceed to Checkout
                </button>
              </Link>
            </div>
            <div className="mt-6 flex items-center justify-center">
              <AlertCircle className="mr-2 h-5 w-5 text-blue-500" />
              <p className="text-sm text-gray-500">
                Secure checkout powered by Stripe
              </p>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
