import React, { useState, useEffect } from "react";
import type { Movie, MovieWithPrice } from "~/types/types";
import { AiFillCloseCircle } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "~/redux/store";
import type { RootState } from "~/redux/types";
import { removeItem } from "~/redux/cartSlice";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";

function generateRandomPrice() {
  return Math.floor(Math.random() * 51 + 50);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/", // Redirect to the login page
        permanent: false,
      },
    };
  }
  // If the user is authenticated, continue to render the page
  return {
    props: {}, // No additional props required
  };
}

export default function ShoppingCart() {
  const dispatch = useDispatch();
  const { data: sessionData } = useSession();
  const cartMovies = useSelector((state: RootState) => state.cart.items);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const removeMovieFromCart = (movie: MovieWithPrice) => {
    // Dispatch an action to remove the item from the cart
    dispatch(removeItem(movie));
  };

  useEffect(() => {
    const totalPrice = cartMovies.reduce(
      (acc: number, _movie: MovieWithPrice) => acc + _movie.price,
      0,
    );
    setTotalPrice(totalPrice);
  }, [cartMovies]);

  return (
    <div className="mx-auto my-10 flex w-full flex-col items-center gap-8">
      <h1 className="text-center text-2xl font-semibold">Your basket</h1>
      <ul className="flex flex-col gap-4">
        {cartMovies.map((_movie: MovieWithPrice, index: number) => (
          <li
            key={index}
            className="mx-auto flex w-full flex-row items-center gap-6 rounded-xl border bg-gray-200 p-3"
          >
            <Image
              src={_movie?.poster ?? "/image-not-found.jpg"}
              alt={_movie?.title}
              width={80}
              height={96}
              priority
              className=" sm:h-32 sm:w-24 md:h-40 md:w-32 lg:h-48 lg:w-36 xl:h-56 xl:w-40"
            />
            <div className="flex flex-1 flex-row items-center gap-8">
              <p className="sm:text-md md:text-l text-sm lg:text-xl xl:text-2xl">
                {_movie?.title}
              </p>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
                {`Price: ${_movie.price} kr`}
              </p>
              <div className="flex items-center">
                <button
                  title="button"
                  type="button"
                  onClick={() => removeMovieFromCart(_movie)}
                  className="flex-0 text-2xl text-red-500 hover:text-red-700"
                >
                  <AiFillCloseCircle />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {totalPrice !== 0 && (
        <p className="sm:text-md md:text-l text-sm lg:text-xl xl:text-2xl">
          {`Total: ${totalPrice} kr`}
        </p>
      )}
      <Link href="/cart-pages/PaymentPage">
        <button
          type="button"
          className="sm:text-md md:text-l rounded-md border border-black bg-sky-400 px-4 py-2 text-sm lg:text-xl xl:text-2xl"
        >
          To Payment
        </button>
      </Link>
    </div>
  );
}
