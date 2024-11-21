import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { MovieWithPrice } from "~/types/types";

interface CartState {
  items: MovieWithPrice[];
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
    addItem: (state, action: PayloadAction<MovieWithPrice>) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<MovieWithPrice>) => {
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
