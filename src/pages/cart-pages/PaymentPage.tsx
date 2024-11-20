import React, { useState, useEffect } from "react";
import type { MovieWithPrice } from "~/types/types";
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
import { useSelector, useDispatch } from "~/redux/store";
import type { RootState } from "~/redux/types";
import { removeItem, clearCart } from "~/redux/cartSlice";
// import { useRouter } from "next/router";
import { /* getSession, */ useSession } from "next-auth/react";
// import type { GetServerSidePropsContext } from "next";
import { api } from "~/utils/api";

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const session = await getSession(context);
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/", // Redirect to the login page
//         permanent: false,
//       },
//     };
//   }
//   // If the user is authenticated, continue to render the page
//   return {
//     props: {}, // No additional props required
//   };
// }

export default function PaymentPage() {
  const { data: sessionData } = useSession();

  const cartMovies = useSelector((state: RootState) => state.cart.items);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const addPurchasedMovie = api.user.addPurchasedMovie.useMutation();

  const dispatch = useDispatch();
  // Function to remove a movie from the cart
  const removeMovieFromCart = (movie: MovieWithPrice) => {
    // Dispatch an action to remove the item from the cart
    dispatch(removeItem(movie));
  };
  //function to clear cart
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  // const router = useRouter();
  // useEffect(() => {
  //   if (!sessionData) {
  //     router.push("/");
  //   }
  // }, []);

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
    <div className="mx-auto my-10 flex w-full flex-col items-center gap-4 md:gap-8">
      <div className="flex flex-col items-center gap-4 md:gap-6 lg:gap-8">
        <h1 className="text-xl font-semibold">Payment Methods</h1>
        <div className="grid grid-cols-2 items-center justify-center gap-4 md:grid-cols-3 md:gap-16 lg:grid-cols-6 lg:gap-28">
          <FaCcVisa size={32} color="#1a1f71" />
          <FaCcMastercard size={32} color="#0061a8" />
          <FaPaypal size={32} color="#003087" />
          <FaGooglePay size={48} color="#4285f4" />
          <SiSamsungpay size={48} color="#0a4b8e" />
          <FaApplePay size={48} color="#000000" />
        </div>
        <h1 className="text-center text-xl font-semibold">Your basket</h1>
        <ul className="flex flex-col gap-4 lg:flex-row">
          {cartMovies.map((movie, index) => (
            <li
              key={index}
              className="mx-auto flex w-full max-w-screen-lg flex-row items-center gap-2 rounded-xl border bg-gray-200 p-2 md:gap-6"
            >
              <Image
                src={movie.poster ?? "/imgs/image-not-found.jpg"}
                alt={movie.title}
                width={24}
                height={40}
                priority
                className="md:h-12 md:w-8"
              />
              <div className="flex flex-row items-center gap-8">
                <p className="text-sm">{movie.title}</p>
                <p className="text-xs">{`Price: ${movie.price} kr`}</p>
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
          <p className="md:text-l text-md lg:text-xl xl:text-2xl">
            {`Total: ${totalPrice} kr`}
          </p>
        )}
      </div>
      <Link href="/cart-pages/PayConfirm">
        <button
          type="button"
          className="sm:text-md md:text-l rounded-md bg-sky-400 px-4 py-2 text-sm lg:text-xl xl:text-2xl"
          onClick={handlePurchase}
        >
          Purchase
        </button>
      </Link>
    </div>
  );
}
