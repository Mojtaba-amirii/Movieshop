import React from "react";
import Image from "next/image";
import Link from "next/link";
import { api } from "~/utils/api";

interface Movie {
  id: string;
  title: string;
  poster: string | null;
  genres: string[];
}

interface SearchProps {
  search: string | undefined;
  genre: string | undefined;
}

function generateRandomPrice() {
  return Math.floor(Math.random() * 51 + 50);
}
export default function MovieList({ search, genre }: SearchProps) {
  // const allMovies = api.movies.getAll.useQuery();
  const movies = api.movies.first100.useQuery();

  console.log("Search: ", search);
  console.log("Genre: ", genre);

  // Filter movies based on the Search
  const filteredMovies = movies.data?.filter((movie: Movie) => {
    if (movie) {
      const isSearchMatch =
        !search || movie.title.toLowerCase().includes(search.toLowerCase());

      // Filter movies based on the selected genre
      const isGenreMatch =
        !genre ||
        genre === "all" ||
        movie.genres.map((g) => g.toLowerCase()).includes(genre.toLowerCase());

      return isSearchMatch && isGenreMatch;
    }
    return false;
  });
  // Slice the array to limit to the first 100 items
  const limitedMovies = filteredMovies?.slice(0, 100);
  return (
    <div>
      <ul className="mx-1 grid grid-cols-2 gap-1 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {limitedMovies?.map((movie) => (
          <li
            key={movie.id}
            className="flex flex-col items-center rounded-md border p-3"
          >
            <Link
              href="/movie-details/[movie]"
              as={`/movie-details/${movie.title}`}
            >
              <div className="aspect-w-24 aspect-h-12 relative">
                <Image
                  src={movie.poster || "/image-not-found.jpg"}
                  alt={movie.title}
                  width={600}
                  height={696}
                  priority
                  className="mx-auto mb-2 h-auto w-full "
                />
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">{movie.title}</div>
                <div className="flex flex-col">
                  <h2>Genres:&nbsp;</h2>
                  <div>{movie.genres.join(", ")}</div>
                </div>
                <div>Price: {generateRandomPrice()} kr</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
