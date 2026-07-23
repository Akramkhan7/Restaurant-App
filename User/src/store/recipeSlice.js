import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const db_url = import.meta.env.VITE_DATABASE_URL;

export const fetchRecipes = createAsyncThunk(
  "recipe/fetchRecipes",
  async (categoryName, { rejectWithValue }) => {
    try {
      const response = await fetch(`${db_url}/recipes.json`);

      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }

      const data = await response.json();

      const loadedRecipes = [];

      if (data) {
        for (const key in data) {
          loadedRecipes.push({
            id: key,
            ...data[key],
          });
        }
      }

      return loadedRecipes.filter(
        (recipe) => recipe.category === categoryName
      );
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const recipeSlice = createSlice({
  name: "recipe",
  initialState: {
    recipes: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearRecipes(state) {
      state.recipes = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const recipeActions = recipeSlice.actions;
export default recipeSlice.reducer;