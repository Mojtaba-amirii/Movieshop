import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Movie } from "~/types/types";
import { api } from "~/utils/api";
import { useDispatch } from "~/redux/store";
import { addItem } from "~/redux/cartSlice";
import { useAnimation } from "~/components/AnimationContext";

function generateRandomPrice() {
  return Math.floor(Math.random() * 51 + 50);
}

async function checkURL(url: string): Promise<boolean> {
  try {
    const response = await fetch(url);
    return response.ok;
  } catch (error) {
    return false;
  }
}

export default function MovieDetails() {
  const [validatedMovie, setValidatedMovie] = useState<Movie>();
  const { setAnimationTriggered } = useAnimation();
  const router = useRouter();
  console.log(router.query.movie);

  const movie = api.movies.findByTitle.useQuery({
    title: router.query.movie as string,
  }).data;
  console.log(movie);

  useEffect(() => {
    if (movie) {
      if (movie.poster) {
        checkURL(movie.poster).then((result: boolean) => {
          if (result) {
            console.log("YES!");
            setValidatedMovie(movie);
          } else {
            console.log("NO!");
            setValidatedMovie({ ...movie, poster: "/image-not-found.jpg" });
          }
        });
      } else {
        setValidatedMovie({ ...movie, poster: "/image-not-found.jpg" });
      }
    }
  }, [movie]);

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (validatedMovie) {
      dispatch(addItem(validatedMovie));
      setAnimationTriggered(true);
      setTimeout(() => {
        setAnimationTriggered(false);
      }, 1000);
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
          <p className="text-lg font-semibold">{generateRandomPrice()} kr</p>
          <button
            type="button"
            className="sm:text-md md:text-l rounded-md border border-black bg-sky-400 px-4 py-2 text-sm lg:text-xl xl:text-2xl"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
}
