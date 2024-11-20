export type Movie = {
  id: string;
  title: string;
  poster: string | null;
  genres: string[];
  fullplot: string | null;
  plot: string | null;
  imdb: {
    id: number;
    rating: number | null;
    votes: number;
  };
};

export type MovieWithPrice = Movie & {
  price: number;
};

export type SearchProps = {
  search: string | undefined;
  genre: string | undefined;
};
