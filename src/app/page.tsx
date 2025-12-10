"use client";

import { useState } from "react";
import { Film, Sparkles } from "lucide-react";

import SearchBar from "~/components/Search";
import MovieList from "~/components/MovieList";

export default function HomePage() {
  const [search, setSearch] = useState<string | undefined>();
  const [genre, setGenre] = useState<string | undefined>();

  return (
    <div className="animate-slide-up">
      {/* Hero Section */}
      <section className="relative mb-8 overflow-hidden rounded-3xl bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 px-6 py-12 text-white shadow-2xl md:py-16">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 animate-pulse" />
            <span className="text-sm font-semibold">Welcome to MovieShop</span>
          </div>
          <h1 className="mb-4 text-4xl leading-tight font-extrabold md:text-5xl lg:text-6xl">
            Discover Your Next
            <span className="block bg-linear-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
              Favorite Movie
            </span>
          </h1>
          <p className="mb-8 text-lg text-blue-100 md:text-xl">
            Stream thousands of movies instantly. No subscription required.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Film className="h-5 w-5" />
              <span className="font-medium">100+ Movies Available</span>
            </div>
            <div className="h-4 w-px bg-white/30"></div>
            <div className="flex items-center gap-2 text-sm">
              <Sparkles className="h-5 w-5" />
              <span className="font-medium">HD Quality</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <SearchBar setSearch={setSearch} setGenre={setGenre} />

      {/* Movie List */}
      <MovieList search={search} genre={genre} />
    </div>
  );
}
