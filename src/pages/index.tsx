import { FC, useState } from "react";
import MovieList from "~/components/MovieList";
import SearchBar from "~/components/Search";

const Home: FC = () => {
  const [search, setSearch] = useState<string | undefined>();
  const [genre, setGenre] = useState<string | undefined>();

  return (
    <div className="container mx-auto p-4">
      <SearchBar setSearch={setSearch} setGenre={setGenre} />
      <MovieList search={search} genre={genre} />
    </div>
  );
};

export default Home;
