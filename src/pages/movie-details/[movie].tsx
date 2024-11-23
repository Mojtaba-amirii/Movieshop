import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import type { Movie } from "~/types/types";
import { api } from "~/utils/api";
import { useDispatch, useSelector } from "~/redux/store";
import { addItem } from "~/redux/cartSlice";
import { useAnimation } from "~/context/AnimationContext";
import { useSession } from "next-auth/react";
import { ArrowBigRight, ArrowLeft, Star } from "lucide-react";
import { MovieDetailsSkeleton } from "~/components/Skeleton";

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
  const [validatedMovie, setValidatedMovie] = useState<Movie>();
  const [cartDuplicate, setCartDuplicate] = useState(false);
  const cartMovies = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const { setAnimationTriggered } = useAnimation();
  const router = useRouter();
  const { data: sessionData } = useSession();

  const { data: movie, isLoading } = api.movies.findByTitle.useQuery({
    title: router.query.movie as string,
  });

  useEffect(() => {
    if (movie) {
      const movieWithPrice = { ...movie, price: Number(router.query.price) };
      if (movieWithPrice.poster) {
        checkURL(movieWithPrice.poster)
          .then((result: boolean) => {
            if (result) {
              setValidatedMovie(movieWithPrice);
            } else {
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

  if (isLoading) {
    return <MovieDetailsSkeleton />;
  }

  return (
    <div className="container mx-auto p-4">
      {validatedMovie ? (
        <div className="flex flex-col md:flex-row md:space-x-8">
          <div className="md:w-1/3">
            <button
              onClick={() => router.back()}
              className="mb-4 flex items-center text-blue-500 hover:text-blue-600"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Movies
            </button>
            <Image
              src={validatedMovie.poster ?? "/imgs/image-not-found.jpg"}
              alt={validatedMovie.title}
              width={300}
              height={450}
              priority
              className="h-auto w-auto rounded-lg object-cover shadow-lg"
            />
          </div>
          <div className="mt-4 md:mt-0 md:w-2/3">
            <h1 className="mb-2 text-3xl font-bold">{validatedMovie.title}</h1>
            <div className="mb-4 flex items-center space-x-2">
              <div className="flex items-center">
                <Star className="mr-1 h-5 w-5 text-yellow-400" />
                <span className="font-semibold">
                  {validatedMovie.imdb?.rating?.toFixed(1) ?? "N/A"}
                </span>
              </div>
              <span className="text-gray-500">|</span>
              <span className="text-gray-500">|</span>
            </div>
            <div className="mb-4">
              <h2 className="mb-2 text-xl font-semibold">Genres</h2>
              <div className="flex flex-wrap gap-2">
                {validatedMovie.genres.map((genre) => (
                  <span
                    key={genre}
                    className="rounded-full bg-gray-200 px-3 py-1 text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <h2 className="mb-2 text-xl font-semibold">Plot</h2>
              <p className="text-gray-700">
                {validatedMovie.fullplot ??
                  validatedMovie.plot ??
                  "No plot available"}
              </p>
            </div>
            <div className="flex flex-col justify-center gap-y-4">
              <p className="text-2xl font-bold text-green-600">
                {validatedMovie.price} kr
              </p>
              {sessionData ? (
                <>
                  <button
                    type="button"
                    className="max-w-96 rounded-md bg-blue-500 px-6 py-2 text-lg font-semibold text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
                    onClick={handleAddToCart}
                    disabled={cartDuplicate}
                  >
                    {cartDuplicate ? "Added to Cart" : "Add to Cart"}
                  </button>
                  <button
                    type="button"
                    className="max-w-96 rounded-md bg-blue-500 px-6 py-2 text-lg font-semibold text-white transition-colors hover:bg-blue-600"
                    onClick={() => router.push("/cart-pages/cart")}
                  >
                    Go to Cart
                    <ArrowBigRight className="ml-2 inline h-6 w-6" />
                  </button>
                </>
              ) : (
                <div className="text-center">
                  <button
                    type="button"
                    className="rounded-md bg-gray-300 px-6 py-2 text-lg font-semibold text-gray-500"
                    disabled
                  >
                    Add to Cart
                  </button>
                  <p className="mt-2 text-sm text-red-500">
                    Sign in to add movie to cart
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-xl">Movie not found</div>
      )}
    </div>
  );
}
