import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Movie } from "~/types/types";

interface CartItem extends Movie {
  quantity: number;
}

interface CartState {
  items: CartItem[];
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
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload,
      );
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (item) => item.id !== action.payload,
          );
        }
      }
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

export const selectCartItemsCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export default cartSlice.reducer;
