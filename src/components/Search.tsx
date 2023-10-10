import React from "react";

interface SearchBarProps {
  setSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
  setGenre: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function SearchBar({ setSearch, setGenre }: SearchBarProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGenre(e.target.value);
  };

  return (
    <div className="min-w-sm mt-4 flex flex-col items-center justify-center gap-2 pb-4 md:flex-row ">
      <input
        className="w-2/3 rounded-md border border-black p-1 pl-10"
        placeholder="Search..."
        type="text"
        onChange={handleSearchChange}
      />
      <select
        title="Genre"
        defaultValue="all"
        onChange={handleGenreChange}
        className="p-1"
      >
        <option value="all">All Genres</option>
        <option value="drama">Drama</option>
        <option value="action">Action</option>
        <option value="horror">Horror</option>
        <option value="comedy">Comedy</option>
      </select>
    </div>
  );
}
