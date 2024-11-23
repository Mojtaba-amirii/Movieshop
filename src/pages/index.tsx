import { type FC, useState } from "react";
import MovieList from "~/components/MovieList";
import SearchBar from "~/components/Search";

const Home: FC = () => {
  const [search, setSearch] = useState<string | undefined>();
  const [genre, setGenre] = useState<string | undefined>();

  return (
    <>
      <SearchBar setSearch={setSearch} setGenre={setGenre} />
      <MovieList search={search} genre={genre} />
    </>
  );
};

export default Home;
