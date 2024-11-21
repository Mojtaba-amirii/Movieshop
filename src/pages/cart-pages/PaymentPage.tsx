import React, { useState, useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import Image from "next/image";
import {
  FaCcVisa,
  FaCcMastercard,
  FaPaypal,
  FaGooglePay,
  FaApplePay,
} from "react-icons/fa";
import { SiSamsungpay } from "react-icons/si";
import Link from "next/link";
import { useSession } from "next-auth/react";

import type { MovieWithPrice } from "~/types/types";
import { useSelector, useDispatch } from "~/redux/store";
import { removeItem, clearCart } from "~/redux/cartSlice";
import { api } from "~/utils/api";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const { data: sessionData } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!sessionData) {
      router.push("/");
    }
  }, [router, sessionData]);

  const cartMovies = useSelector((state) => state.cart.items);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const addPurchasedMovie = api.user.addPurchasedMovie.useMutation();
  const dispatch = useDispatch();

  const removeMovieFromCart = (movie: MovieWithPrice) => {
    dispatch(removeItem(movie));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // Calculate the total price using reduce
  useEffect(() => {
    const totalPrice = cartMovies.reduce(
      (acc: number, _movie: MovieWithPrice) => acc + _movie.price,
      0,
    );
    setTotalPrice(totalPrice);
  }, [cartMovies]);

  function handlePurchase() {
    if (sessionData) {
      addPurchasedMovie.mutate({
        userId: sessionData.user.id,
        movieId: cartMovies.map((movie) => movie.id),
      });
      handleClearCart();
    }
  }

  return (
    <div className="mx-auto my-10 flex w-full flex-col items-center gap-6 md:gap-10">
      <div className="flex flex-col items-center gap-6 md:gap-8 lg:gap-10">
        <h1 className="text-2xl font-bold">Payment Methods</h1>
        <div className="grid grid-cols-2 items-center justify-center gap-6 md:grid-cols-3 md:gap-12 lg:grid-cols-6 lg:gap-16">
          <FaCcVisa size={40} color="#1a1f71" />
          <FaCcMastercard size={40} color="#0061a8" />
          <FaPaypal size={40} color="#003087" />
          <FaGooglePay size={48} color="#4285f4" />
          <SiSamsungpay size={48} color="#0a4b8e" />
          <FaApplePay size={48} color="#000000" />
        </div>
        <h1 className="text-center text-2xl font-bold">Your Basket</h1>
        <ul className="flex flex-col gap-6 lg:flex-row">
          {cartMovies.map((movie, index) => (
            <li
              key={index}
              className="mx-auto flex w-full max-w-screen-lg flex-row items-center gap-4 rounded-xl border bg-gray-200 p-4 md:gap-8"
            >
              <Image
                src={movie.poster ?? "/imgs/image-not-found.jpg"}
                alt={movie.title}
                width={48}
                height={72}
                priority
                className="md:h-16 md:w-12"
              />
              <div className="flex flex-row items-center gap-8">
                <p className="text-lg font-medium">{movie.title}</p>
                <p className="text-md">{`Price: ${movie.price} kr`}</p>
                <button
                  title="button"
                  type="button"
                  onClick={() => removeMovieFromCart(movie)}
                  className="text-2xl text-red-500 hover:text-red-700"
                >
                  <AiFillCloseCircle />
                </button>
              </div>
            </li>
          ))}
        </ul>
        {totalPrice !== 0 && (
          <p className="text-lg font-semibold lg:text-xl xl:text-2xl">
            {`Total: ${totalPrice} kr`}
          </p>
        )}
      </div>
      <Link href="/cart-pages/PayConfirm">
        <button
          type="button"
          className="rounded-md bg-sky-500 px-6 py-3 text-lg font-semibold text-white hover:bg-sky-600 lg:text-xl xl:text-2xl"
          onClick={handlePurchase}
        >
          Purchase
        </button>
      </Link>
    </div>
  );
}
