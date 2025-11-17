"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState, useEffect, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowBigRight, ArrowLeft, Star } from "lucide-react";

import { api } from "~/trpc/react";
import type { Movie } from "~/types/types";
import { addItem } from "~/redux/cartSlice";
import { useDispatch, useSelector } from "~/redux/store";
import { useAnimation } from "~/context/AnimationContext";
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

export default function MovieDetailsPage({
  params,
}: {
  params: Promise<{ movie: string }>;
}) {
  const resolvedParams = use(params);
  const [validatedMovie, setValidatedMovie] = useState<Movie>();
  const [cartDuplicate, setCartDuplicate] = useState(false);
  const cartMovies = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const { setAnimationTriggered } = useAnimation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: sessionData } = useSession();

  const movieTitle = decodeURIComponent(resolvedParams.movie);
  const price = searchParams?.get("price");

  const { data: movie, isLoading } = api.movies.findByTitle.useQuery({
    title: movieTitle,
  });

  // Calculate cartDuplicate during render
  const isMovieInCart = movie
    ? cartMovies.some((cartMovie) => cartMovie.id === movie.id)
    : false;

  useEffect(() => {
    setCartDuplicate(isMovieInCart);
  }, [isMovieInCart]);

  useEffect(() => {
    if (movie) {
      const movieWithPrice = {
        ...movie,
        price: price ? Number(price) : (movie.price ?? 0),
      };
      if (movieWithPrice.poster) {
        void checkURL(movieWithPrice.poster)
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
    }
  }, [movie, price]);

  const handleAddToCart = () => {
    if (validatedMovie) {
      dispatch(addItem(validatedMovie));
      setAnimationTriggered(true);
      setTimeout(() => {
        setAnimationTriggered(false);
      }, 1500);

      setCartDuplicate(true);
    }
  };

  if (isLoading) {
    return <MovieDetailsSkeleton />;
  }

  return (
    <div className="animate-slide-up container mx-auto p-4">
      {validatedMovie ? (
        <div className="overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5">
          <div className="flex flex-col gap-8 p-6 md:flex-row md:p-8">
            {/* Movie Poster */}
            <div className="md:w-1/3">
              <div className="group relative aspect-2/3 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/10">
                <Image
                  src={validatedMovie.poster ?? "/imgs/image-not-found.jpg"}
                  alt={validatedMovie.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Movie Info */}
            <div className="flex-1 md:w-2/3">
              <div className="space-y-6">
                {/* Title and Rating */}
                <div>
                  <h1 className="mb-3 text-4xl font-extrabold text-gray-900">
                    {validatedMovie.title}
                  </h1>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 rounded-full bg-yellow-50 px-4 py-2 ring-2 ring-yellow-400">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-gray-900">
                        {validatedMovie.imdb?.rating?.toFixed(1) ?? "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Genres */}
                <div>
                  <h2 className="mb-3 text-sm font-bold tracking-wider text-gray-500 uppercase">
                    Genres
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {validatedMovie.genres.map((genre) => (
                      <span
                        key={genre}
                        className="rounded-full bg-linear-to-r from-blue-100 to-purple-100 px-4 py-2 text-sm font-semibold text-blue-900 ring-1 ring-blue-200"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Plot */}
                <div>
                  <h2 className="mb-3 text-sm font-bold tracking-wider text-gray-500 uppercase">
                    Synopsis
                  </h2>
                  <p className="leading-relaxed text-gray-700">
                    {validatedMovie.fullplot ??
                      validatedMovie.plot ??
                      "No plot available"}
                  </p>
                </div>

                {/* Price and Actions */}
                <div className="space-y-4 rounded-2xl bg-linear-to-br from-gray-50 to-blue-50 p-6 ring-1 ring-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold tracking-wider text-gray-500 uppercase">
                      Price
                    </span>
                    <span className="text-3xl font-extrabold text-green-600">
                      {validatedMovie.price} kr
                    </span>
                  </div>

                  {sessionData ? (
                    <div className="flex flex-col gap-3">
                      <button
                        type="button"
                        className="flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:hover:scale-100"
                        onClick={handleAddToCart}
                        disabled={cartDuplicate}
                      >
                        {cartDuplicate ? "✓ Added to Cart" : "Add to Cart"}
                      </button>
                      <button
                        type="button"
                        className="flex items-center justify-center gap-2 rounded-xl border-2 border-gray-300 bg-white px-8 py-4 text-lg font-bold text-gray-900 transition-all duration-300 hover:border-blue-500 hover:bg-gray-50"
                        onClick={() => router.push("/cart")}
                      >
                        Go to Cart
                        <ArrowBigRight className="h-6 w-6" />
                      </button>
                    </div>
                  ) : (
                    <div className="rounded-xl bg-red-50 p-4 text-center ring-1 ring-red-200">
                      <p className="font-semibold text-red-600">
                        Sign in to add movie to cart
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Back Button */}
              <button
                type="button"
                onClick={() => router.back()}
                className="mt-10 ml-0 flex cursor-pointer items-center gap-2 rounded-lg bg-blue-400 px-4 py-2 text-sm font-medium shadow-md transition-all duration-200 hover:bg-blue-500 hover:shadow-lg"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Movies</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex min-h-[400px] items-center justify-center rounded-2xl bg-white shadow-lg">
          <p className="text-xl font-semibold text-gray-600">Movie not found</p>
        </div>
      )}
    </div>
  );
}
