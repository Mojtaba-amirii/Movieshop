export type Movie = {
  id: string;
  title: string;
  poster: string | null;
  genres: string[];
  fullplot: string | null;
  plot: string | null;
};
export type MovieWithPrice = {
  id: string;
  title: string;
  poster: string | null;
  genres: string[];
  fullplot: string | null;
  plot: string | null;
  price: number
};
