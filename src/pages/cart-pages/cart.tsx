import Link from "next/link";
import Image from "next/image";
import { useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShoppingBag,
  Shield,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
} from "lucide-react";

import type { Movie } from "~/types/types";
import { useSelector, useDispatch } from "~/redux/store";
import { removeItem, addItem, clearCart } from "~/redux/cartSlice";

export default function ShoppingCart() {
  const dispatch = useDispatch();
  const cartMovies = useSelector((state) => state.cart.items);

  // Calculate total price using useMemo for performance
  const totalPrice = useMemo(() => {
    return cartMovies.reduce(
      (acc, movie) => acc + (movie.price ?? 0) * movie.quantity,
      0,
    );
  }, [cartMovies]);

  // Calculate total items count
  const totalItems = useMemo(() => {
    return cartMovies.reduce((acc, movie) => acc + movie.quantity, 0);
  }, [cartMovies]);

  const handleRemoveItem = useCallback(
    (movieId: string) => {
      dispatch(removeItem(movieId));
    },
    [dispatch],
  );

  const handleAddItem = useCallback(
    (movie: Movie) => {
      dispatch(addItem(movie));
    },
    [dispatch],
  );

  const handleClearCart = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="mx-auto my-10 max-w-4xl p-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900">Your Shopping Cart</h1>
        {cartMovies.length > 0 && (
          <p className="mt-2 text-sm text-gray-600">
            {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
          </p>
        )}
      </motion.div>

      {cartMovies.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center rounded-xl bg-linear-to-br from-gray-50 to-gray-100 p-12 text-center shadow-lg"
        >
          <ShoppingBag className="mb-6 h-20 w-20 text-gray-400" />
          <h2 className="mb-4 text-2xl font-semibold text-gray-700">
            Your cart is empty
          </h2>
          <p className="mb-8 text-gray-500">
            Looks like you haven&apos;t added any movies yet
          </p>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3 text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            >
              <ArrowLeft className="h-5 w-5" />
              Continue Shopping
            </motion.button>
          </Link>
        </motion.div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Cart Items
              </h2>
              <button
                type="button"
                onClick={handleClearCart}
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-red-600 transition-colors hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
                Clear Cart
              </button>
            </div>

            <AnimatePresence>
              <div className="space-y-4">
                {cartMovies.map((movie) => (
                  <motion.div
                    key={movie.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-md"
                  >
                    <div className="relative overflow-hidden rounded-lg">
                      <Image
                        src={movie?.poster ?? "/imgs/image-not-found.jpg"}
                        alt={movie?.title}
                        width={80}
                        height={120}
                        className="object-cover transition-transform hover:scale-105"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="mb-1 text-lg font-semibold text-gray-900">
                        {movie?.title}
                      </h3>
                      <p className="mb-3 text-sm text-gray-500">
                        {movie.genres.slice(0, 3).join(", ")}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(movie.id)}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 transition-colors hover:bg-gray-50"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="min-w-8 text-center font-medium">
                            {movie.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleAddItem(movie)}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 transition-colors hover:bg-gray-50"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900">
                            {movie.price} kr
                          </p>
                          {movie.quantity > 1 && (
                            <p className="text-sm text-gray-500">
                              {movie.quantity} × {movie.price} kr
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveItem(movie.id)}
                      className="rounded-full p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                      title="Remove from cart"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="sticky top-8 rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-lg"
            >
              <h3 className="mb-6 text-xl font-semibold text-gray-900">
                Order Summary
              </h3>

              <div className="mb-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Subtotal ({totalItems} items)
                  </span>
                  <span className="font-medium">{totalPrice} kr</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="border-t border-gray-300 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">
                      Total
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                      {totalPrice} kr
                    </span>
                  </div>
                </div>
              </div>

              <Link href="/cart-pages/PaymentPage">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-xl bg-blue-600 px-6 py-4 text-center text-base font-semibold text-white shadow-lg transition-all hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                >
                  Proceed to Checkout
                </motion.button>
              </Link>

              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Secure checkout powered by Stripe</span>
              </div>

              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 w-full rounded-xl border border-gray-300 px-6 py-3 text-center text-base font-medium text-gray-700 transition-all hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:outline-none"
                >
                  Continue Shopping
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
