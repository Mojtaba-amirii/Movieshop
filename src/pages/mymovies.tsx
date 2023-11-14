import React, { useEffect, useState } from "react";
// import type { Movie } from "~/types/types";
import Image from "next/image";
import { useSelector /* , useDispatch */ } from "~/redux/store";
import type { RootState } from "~/redux/types";
// import { removeItem } from "~/redux/cartSlice";
import { GetServerSidePropsContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { Movie, MovieWithPrice } from "~/types/types";
import SearchBar from "~/components/Search";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/", // Redirect to the login page
        permanent: false,
      },
    };
  }
  // If the user is authenticated, continue to render the page
  return {
    props: {}, // No additional props required
  };
}

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

export default function MyMovies() {
  const { data: sessionData } = useSession();
  const [validatedMovies, setValidatedMovies] = useState<Movie[]>();
  const [search, setSearch] = useState<string | undefined>();
  const [genre, setGenre] = useState<string | undefined>();

  const myMoviesIds = api.user.getMyMovies.useQuery(
    { userId: sessionData?.user?.id ? sessionData.user.id : "" },
    { enabled: sessionData !== null },
  ).data?.purchasedMovies;
  console.log(myMoviesIds);

  //const dispatch = useDispatch();

  const { data: movies } = api.movies.findById.useQuery(
    {
      movieIds: myMoviesIds ? myMoviesIds : [],
    },
    { enabled: myMoviesIds !== undefined },
  );

  useEffect(() => {
    if (movies) {
      Promise.all(
        movies.map(async (movie) => {
          /* const randomPrice = generateRandomPrice();
            dispatch(setMoviePrice({ movieId: movie.id, price: randomPrice })); */

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
            return Promise.resolve({
              ...movie,
              poster: "/image-not-found.jpg",
            });
          }
        }),
      )
        .then((updatedMovies) => {
          console.log('updatedMovies', updatedMovies)
          setValidatedMovies(updatedMovies);
        })
        .catch((error) => console.log(error));
    }
  }, [movies]);

  console.log("Search: ", search);
  console.log("Genre: ", genre);

  // Filter movies based on the Search
  const filteredMovies = validatedMovies?.filter((movie: Movie) => {
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

  return (
    <div>
      {sessionData?.user?.id ? "" : ""}
      <h1 className="mb-4 text-center text-2xl font-semibold">My Movies</h1>
      <SearchBar setSearch={setSearch} setGenre={setGenre} />
      <ul className="mx-1 grid grid-cols-2 gap-1 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {filteredMovies?.map((movie) => (
          <li
            key={movie.id}
            className="flex flex-col items-center rounded-md border p-3"
          >
            <div className="aspect-w-24 aspect-h-12 ">
              <Image
                src={movie.poster ?? "/image-not-found.jpg"}
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
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  /* const myMovies = useSelector((state: RootState) => state.cart.items); */

  // const [totalPrice, setTotalPrice] = useState<number>(0);

  // const dispatch = useDispatch();
  // Function to remove a movie from the cart

  // const removeMovieFromCart = (movie: Movie) => {
  //   // Dispatch an action to remove the item from the cart
  //   dispatch(removeItem(movie));
  // };

  // Calculate the total price using reduce
  /* useEffect(() => {
      const totalPrice = myMovies.reduce(
        (acc: number) => acc + generateRandomPrice(),
        0,
      );
      setTotalPrice(totalPrice);
    }, [myMovies]); */

  /* return (
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
        <p>{myMovies.length != 0 ? totalPrice : " "}</p>
      </div>
    );
  } */
}
