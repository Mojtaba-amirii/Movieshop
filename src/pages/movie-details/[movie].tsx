import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export interface Movie {
  id: number;
  name: string;
  image: {
    medium: string;
    original: string;
  };
  price: number;
  genres: string[];
  summary: string;
}

export default function MovieDetails() {
  const [movie, setMovie] = useState<Movie>();
  const router = useRouter();
  console.log(router.query.movie);

  let movieName: string;
  if (router.query.movie) {
    movieName = router.query.movie as string;
    movieName = movieName.replaceAll("%20", " ");
    console.log(movieName);
  }

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response: AxiosResponse<Movie[]> = await axios.get(
          "https://api.tvmaze.com/shows",
        );

        const movies = response.data.map((movie) => ({
          ...movie,
          price: getRandomPrice(50, 100),
          genres: movie.genres.length != 0 ? movie.genres : ["Unknown"],
        }));

        setMovie(movies.filter((movie) => movie.name === movieName)[0]);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }
    fetchMovies().catch((error) => console.error(error));
  }, [router]);

  function getRandomPrice(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  console.log(movie);

  // const handleAddToCart = () => {};

  return (
    <div>
      {movie ? (
        <div className="mx-auto flex w-[90%] flex-col items-center">
          <h1 className="text-2xl font-bold">{movie.name}</h1>
          <img
            src={movie.image.original}
            alt={movie.name}
            className="my-2 h-auto w-[60%]"
          />
          <div className="flex">
            <h2>Genres:&nbsp;</h2>
            <div>{movie.genres.join(", ")}</div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: movie.summary }}></div>
          <p className="text-lg font-semibold">{movie.price} kr</p>
          <button
            type="button"
            className="rounded-full bg-gray-200 px-2"
            // onClick={() => handleAddToCart()}
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
