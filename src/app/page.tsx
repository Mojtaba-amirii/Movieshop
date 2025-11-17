"use client";

import { useState } from "react";
import SearchBar from "~/components/Search";
import MovieList from "~/components/MovieList";

export default function HomePage() {
  const [search, setSearch] = useState<string | undefined>();
  const [genre, setGenre] = useState<string | undefined>();

  return (
    <>
      <SearchBar setSearch={setSearch} setGenre={setGenre} />
      <MovieList search={search} genre={genre} />
    </>
  );
}
