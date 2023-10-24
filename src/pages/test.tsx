import { useEffect, useState } from "react";
import SignInOut from "~/components/signInOut";
import { Movie } from "~/types/types";
import { api } from "~/utils/api";
 
export default function () {
  const [validatedMovies, setValidatedMovies] = useState<Movie[]>();

  const movies = api.movies.first100.useQuery().data;

  console.log(movies);
  console.log(validatedMovies);

  /* useEffect(() => {
    return setValidatedMovies(
      movies?.map((movie: Movie) => {
        if (movie.poster) {
          checkURL(movie.poster).then((result: boolean) => {
            if (result) {
              console.log("YES!");
              return movie;
            } else {
              console.log("NO!");
              return { ...movie, poster: "/image-not-found.jpg" };
            }
          });
        } else {
          return { ...movie, poster: "/image-not-found.jpg" };
        }
      }),
    );
  }, [movies]); */
  useEffect(() => {
    if (movies) {
      Promise.all(
        movies.map((movie: Movie) => {
          if (movie.poster) {
            return checkURL(movie.poster).then((result: boolean) => {
              if (result) {
                console.log("YES!");
                return movie;
              } else {
                console.log("NO!");
                return { ...movie, poster: "/image-not-found.jpg" };
              }
            });
          } else {
            return Promise.resolve({ ...movie, poster: "/image-not-found.jpg" });
          }
        })
      ).then((updatedMovies) => {
        setValidatedMovies(updatedMovies as Movie[]);
      });
    }
  }, [movies]);

  async function checkURL(url: string): Promise<boolean> {
    try {
      const response = await fetch(url);
      return response.ok;
    } catch (error) {
      return false;
    }
  }
  
  return (
    <>
    <SignInOut />
      {/* <p>movies: {movies?.filter(movie => typeof movie.poster != 'string' ).length}</p> */}
      <p>ValidatedMovies: {validatedMovies?.filter(movie => typeof movie.poster != 'string' ).length}</p>
    </>
  );
}
