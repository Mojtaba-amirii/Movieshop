import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "~/types/types";

interface CartState {
  items: Movie[];
}

const initialState: CartState = {
  items: [],
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
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
