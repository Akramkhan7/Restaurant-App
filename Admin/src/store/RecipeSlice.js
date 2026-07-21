import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRecipes = createAsyncThunk(
  "recipe/fetchRecipes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://restaurant-app-166ea-default-rtdb.firebaseio.com/recipes.json"
      );

      const data = await response.json();

      const loadedRecipes = [];

      for (const key in data) {
        loadedRecipes.push({
          id: key,
          ...data[key],
        });
      }

      return loadedRecipes;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  recipes: JSON.parse(localStorage.getItem("recipes")) || [],
  loading: false,
  error: null,
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState,

  reducers: {
    addRecipe(state, action) {
      state.recipes.push(action.payload);
      localStorage.setItem("recipes", JSON.stringify(state.recipes));
    },

    updateRecipe(state, action) {
      const index = state.recipes.findIndex(
        (recipe) => recipe.id === action.payload.id
      );

      if (index !== -1) {
        state.recipes[index] = action.payload;
        localStorage.setItem("recipes", JSON.stringify(state.recipes));
      }
    },

    deleteRecipe(state, action) {
      state.recipes = state.recipes.filter(
        (recipe) => recipe.id !== action.payload
      );

      localStorage.setItem("recipes", JSON.stringify(state.recipes));
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
        localStorage.setItem("recipes", JSON.stringify(action.payload));
      })

      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const recipeActions = recipeSlice.actions;
export default recipeSlice.reducer;