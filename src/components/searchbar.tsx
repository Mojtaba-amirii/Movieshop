import { useState } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState<string>();
  const [genre, setGenre] = useState<string>();

  console.log(search);

  return (
    <>
      <div className="min-w-sm mt-4 flex  flex-col items-center justify-center gap-2 md:flex-row">
        <input
          className=" w-2/3  rounded-md border border-black  "
          placeholder="Search..."
          type="Text"
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          title="Genre"
          defaultValue="all"
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value="all">All Genres</option>
          <option value="drama">Drama</option>
          <option value="action">Action</option>
          <option value="horror">Horror</option>
          <option value="comedy">Comedy</option>
        </select>
      </div>
    </>
  );
}
