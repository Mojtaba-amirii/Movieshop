import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "~/types/types";

interface CartState {
  items: Movie[];
  moviePrices: Record<string, number>;
}

const initialState: CartState = {
  items: [],
  moviePrices: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Movie>) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<Movie>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    clearCart: (state) => {
      state.items = [];
    },
    setMoviePrice: (
      state,
      action: PayloadAction<{ movieId: string; price: number }>,
    ) => {
      state.moviePrices[action.payload.movieId] = action.payload.price || 0;
    },
  },
});

export const { addItem, removeItem, clearCart, setMoviePrice } =
  cartSlice.actions;
export default cartSlice.reducer;
