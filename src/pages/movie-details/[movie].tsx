import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import type { MovieWithPrice } from "~/types/types";
import { api } from "~/utils/api";
import { useDispatch, useSelector } from "~/redux/store";
import { addItem } from "~/redux/cartSlice";
import { useAnimation } from "~/context/AnimationContext";
import { useSession } from "next-auth/react";

async function checkURL(url: string): Promise<boolean> {
  try {
    const response = await fetch(url);
    return response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export default function MovieDetails() {
  const [validatedMovie, setValidatedMovie] = useState<MovieWithPrice>();
  const [cartDuplicate, setCartDuplicate] = useState(false);
  const cartMovies = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const { setAnimationTriggered } = useAnimation();
  const router = useRouter();
  const { data: sessionData } = useSession();

  const movie = api.movies.findByTitle.useQuery({
    title: router.query.movie as string,
  }).data;
  console.log(movie);

  useEffect(() => {
    if (movie) {
      const movieWithPrice = { ...movie, price: Number(router.query.price) };
      console.log(movieWithPrice);
      if (movieWithPrice.poster) {
        checkURL(movieWithPrice.poster)
          .then((result: boolean) => {
            if (result) {
              console.log("YES!");
              setValidatedMovie(movieWithPrice);
            } else {
              console.log("NO!");
              setValidatedMovie({
                ...movieWithPrice,
                poster: "/imgs/image-not-found.jpg",
              });
            }
          })
          .catch((error) => console.log(error));
      } else {
        setValidatedMovie({
          ...movieWithPrice,
          poster: "/imgs/image-not-found.jpg",
        });
      }
      if (
        cartMovies.filter((cartMovie) => cartMovie.id === movie.id).length !== 0
      ) {
        setCartDuplicate(true);
      }
    }
  }, [movie, cartMovies, router.query.price]);

  const handleAddToCart = () => {
    if (validatedMovie) {
      dispatch(addItem(validatedMovie));
      setAnimationTriggered(true);
      setTimeout(() => {
        setAnimationTriggered(false);
      }, 1000);

      setCartDuplicate(true);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {validatedMovie ? (
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-3xl font-bold">{validatedMovie.title}</h1>
          <Image
            src={validatedMovie.poster ? validatedMovie.poster : ""}
            alt={validatedMovie.title}
            width={160}
            height={240}
            priority
            className="rounded-lg shadow-lg"
          />
          <div className="flex space-x-2">
            <h2 className="font-semibold">Genres:</h2>
            <div>{validatedMovie.genres.join(", ")}</div>
          </div>
          <div
            className="text-center"
            dangerouslySetInnerHTML={{
              __html: validatedMovie.fullplot
                ? validatedMovie.fullplot
                : validatedMovie.plot
                  ? validatedMovie.plot
                  : "No Plot Available",
            }}
          ></div>
          <p className="text-xl font-semibold">{validatedMovie.price} kr</p>
          {sessionData ? (
            <div className="flex flex-col items-center space-y-2">
              <button
                type="button"
                className="rounded-md border border-black bg-sky-400 px-4 py-2 text-lg disabled:opacity-40"
                onClick={handleAddToCart}
                disabled={cartDuplicate}
              >
                Add to Cart
              </button>
              {cartDuplicate && (
                <p className="text-red-400">Movie is already added</p>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <button
                type="button"
                className="w-fit rounded-md border border-black bg-sky-400 px-4 py-2 text-lg opacity-20"
                onClick={handleAddToCart}
                disabled
              >
                Add to Cart
              </button>
              <p className="text-lg text-red-400">
                Sign in to add movie to cart
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center text-xl">Loading...</div>
      )}
    </div>
  );
}
