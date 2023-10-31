import React, { useState } from "react";
import SearchBar from "~/components/Search";

export default function Admin() {
  const [search, setSearch] = useState<string | undefined>();
  const [genre, setGenre] = useState<string | undefined>();
  return (
    <div className="flex flex-col items-center ">
      <h1 className="my-10 text-center text-5xl">Products</h1>
      <SearchBar setSearch={setSearch} setGenre={setGenre} />
      <p>{search}</p>
      <p>{genre}</p>
    </div>
  );
}
