import {
  type SetStateAction,
  type Dispatch,
  type ChangeEvent,
  memo,
  type FC,
} from "react";
import { Search, Filter } from "lucide-react";

interface SearchBarProps {
  setSearch: Dispatch<SetStateAction<string | undefined>>;
  setGenre: Dispatch<SetStateAction<string | undefined>>;
  genres?: string[];
}

const SearchBar: FC<SearchBarProps> = ({
  setSearch,
  setGenre,
  genres = ["all", "drama", "action", "horror", "comedy"],
}: SearchBarProps) => {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleGenreChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setGenre(e.target.value);
  };

  return (
    <section className="animate-scale-in mb-8">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col gap-4 sm:flex-row">
          {/* Search Input */}
          <div className="relative flex-1">
            <label htmlFor="search" className="sr-only">
              Search movies
            </label>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="search"
              name="search"
              className="w-full rounded-xl border-2 border-gray-200 bg-white py-3 pr-4 pl-12 text-gray-900 shadow-sm transition-all duration-200 placeholder:text-gray-400 hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none"
              placeholder="Search for movies..."
              type="text"
              onChange={handleSearchChange}
            />
          </div>

          {/* Genre Select */}
          <div className="relative sm:w-48">
            <label htmlFor="genre" className="sr-only">
              Filter by genre
            </label>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              id="genre"
              name="genre"
              title="Genre"
              defaultValue="all"
              onChange={handleGenreChange}
              className="w-full cursor-pointer appearance-none rounded-xl border-2 border-gray-200 bg-white py-3 pr-10 pl-12 text-gray-900 shadow-sm transition-all duration-200 hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none"
            >
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre.charAt(0).toUpperCase() + genre.slice(1)}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(SearchBar);
