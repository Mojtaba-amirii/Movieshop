import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import type { MovieWithPrice } from "~/types/types";
import { api } from "~/utils/api";
import { useDispatch, useSelector } from "~/redux/store";
import { addItem } from "~/redux/cartSlice";
import { useAnimation } from "~/components/AnimationContext";
import { useSession } from "next-auth/react";
import type { RootState } from "~/redux/types";

async function checkURL(url: string): Promise<boolean> {
  try {
    const response = await fetch(url);
    return response.ok;
  } catch (error) {
    return false;
  }
}

export default function MovieDetails() {
  const [validatedMovie, setValidatedMovie] = useState<MovieWithPrice>();
  const [cartDuplicate, setCartDuplicate] = useState(false);
  const cartMovies = useSelector((state: RootState) => state.cart.items);

  const { setAnimationTriggered } = useAnimation();
  const router = useRouter();
  const { data: sessionData } = useSession();

  const movie = api.movies.findByTitle.useQuery({
    title: router.query.movie as string,
  }).data;
  console.log(movie);

  useEffect(() => {
    // if() {
    // }
  }, []);

  useEffect(() => {
    console.log("hejsan");
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
                poster: "/image-not-found.jpg",
              });
            }
          })
          .catch((error) => console.log(error));
      } else {
        setValidatedMovie({
          ...movieWithPrice,
          poster: "/image-not-found.jpg",
        });
      }
      if (
        cartMovies.filter((cartMovie) => cartMovie.id === movie.id).length !== 0
      ) {
        setCartDuplicate(true);
      }
    }
  }, [movie, cartMovies, router.query.price]);

  const dispatch = useDispatch();

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
    <div>
      {validatedMovie ? (
        <div className="mx-auto flex w-[90%] flex-col items-center">
          <h1 className="text-2xl font-bold">{validatedMovie.title}</h1>
          <Image
            src={validatedMovie.poster ? validatedMovie.poster : ""}
            alt={validatedMovie.title}
            width={80}
            height={96}
            priority
            className="mb-2 sm:h-32 sm:w-24 md:h-44 md:w-36 lg:h-56 lg:w-40 xl:h-64 xl:w-56"
          />
          <div className="flex">
            <h2>Genres:&nbsp;</h2>
            <div>{validatedMovie.genres.join(", ")}</div>
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: validatedMovie.fullplot
                ? validatedMovie.fullplot
                : validatedMovie.plot
                ? validatedMovie.plot
                : "No Plot Available",
            }}
          ></div>
          <p className="text-lg font-semibold">{validatedMovie.price} kr</p>
          {sessionData ? (
            <div>
              <button
                type="button"
                className="sm:text-md md:text-l rounded-md  border border-black bg-sky-400 px-4 py-2 text-sm disabled:opacity-40 lg:text-xl xl:text-2xl"
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
            <div className="flex flex-col items-center">
              <button
                type="button"
                className="sm:text-md md:text-l w-fit rounded-md border border-black bg-sky-400 px-4 py-2 text-sm opacity-20 lg:text-xl xl:text-2xl"
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
        "Loading..."
      )}
    </div>
  );
}
