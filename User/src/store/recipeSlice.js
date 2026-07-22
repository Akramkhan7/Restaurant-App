import { createSlice } from "@reduxjs/toolkit";

const recipeSlice = createSlice({
  name: "recipe",
  initialState: {
    recipes: [],
  },
  reducers: {
    setRecipes(state, action) {
      state.recipes = action.payload;
    },
  },
});

export const recipeActions = recipeSlice.actions;
export default recipeSlice.reducer;