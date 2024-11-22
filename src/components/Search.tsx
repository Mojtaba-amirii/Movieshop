import React from "react";

interface SearchBarProps {
  setSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
  setGenre: React.Dispatch<React.SetStateAction<string | undefined>>;
  genres?: string[];
}

export default function SearchBar({
  setSearch,
  setGenre,
  genres = ["all", "drama", "action", "horror", "comedy"],
}: SearchBarProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGenre(e.target.value);
  };

  return (
    <div className="min-w-sm mt-4 flex flex-col items-center justify-center gap-2 pb-4 md:flex-row">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        id="search"
        name="search"
        className="w-2/3 rounded-md border border-black p-1 pl-10"
        placeholder="Search..."
        type="text"
        onChange={handleSearchChange}
      />
      <label htmlFor="genre" className="sr-only">
        Genre
      </label>
      <select
        id="genre"
        name="genre"
        title="Genre"
        defaultValue="all"
        onChange={handleGenreChange}
        className="rounded-md border border-black p-1"
      >
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre.charAt(0).toUpperCase() + genre.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
