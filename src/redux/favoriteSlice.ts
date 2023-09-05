// favoriteSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState: number[] = JSON.parse(localStorage.getItem("favorites") || "[]");

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorite: (state, action) => {
      const itemToAdd = action.payload;
      if (!state.includes(itemToAdd)) {
        state.push(itemToAdd);
        localStorage.setItem("favorites", JSON.stringify(state));
      }
    },
    removeFromFavorite: (state, action) => {
      const itemToRemove = action.payload;
      const index = state.indexOf(itemToRemove);
      if (index !== -1) {
        state.splice(index, 1);
        localStorage.setItem("favorites", JSON.stringify(state));
      }
    },
  },
});

export const { addToFavorite, removeFromFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
