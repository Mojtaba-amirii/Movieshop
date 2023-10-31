import React, { useEffect, useState } from "react";
import type { Movie } from "~/types/types";
import Image from "next/image";
import { useSelector, useDispatch } from "~/redux/store";
import type { RootState } from "~/redux/types";
import { removeItem } from "~/redux/cartSlice";

function generateRandomPrice() {
  return Math.floor(Math.random() * 51 + 50);
}

export default function MyMovies() {
  const myMovies = useSelector((state: RootState) => state.cart.items);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const dispatch = useDispatch();
  // Function to remove a movie from the cart
  const removeMovieFromCart = (movie: Movie) => {
    // Dispatch an action to remove the item from the cart
    dispatch(removeItem(movie));
  };

  // Calculate the total price using reduce
  useEffect(() => {
    const totalPrice = myMovies.reduce(
      (acc: number, _movie: Movie) => acc + generateRandomPrice(),
      0,
    );
    setTotalPrice(totalPrice);
  }, [myMovies]);

  return (
    <div className=" container mx-auto  px-4">
      <h1 className="mb-4 text-center text-2xl font-semibold">My Movies</h1>
      <ul className="mx-1 grid grid-cols-2 gap-1  md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {myMovies.map((movie, index) => (
          <li
            key={index}
            className="mx-auto flex w-full flex-col items-center gap-6 rounded-xl border bg-gray-100 p-3"
          >
            <Image
              src={movie.poster ?? "/image-notfound.jpg"}
              alt={movie.title}
              width={336}
              height={346}
              priority
              className="mb-2 h-auto w-auto "
            />
            <div className="flex flex-1 flex-col items-center gap-8">
              <p className="sm:text-md md:text-md lg:text-l lg:text-l text-sm">
                {movie.title}
              </p>
              <p className=" text-xs sm:text-base md:text-sm">
                {`Price: ${generateRandomPrice()} kr`}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
