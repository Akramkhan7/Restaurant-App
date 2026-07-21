import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://restaurant-app-166ea-default-rtdb.firebaseio.com/categories.json",
      );
      const data = await response.json();

      const loadedCategories = [];

      for (const key in data) {
        loadedCategories.push({
          id: key,
          ...data[key],
        });
      }

      return loadedCategories;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const initialState = {
  categories: JSON.parse(localStorage.getItem("categories")) || [],
  loading: false,
  categoryCount: 0,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory(state, action) {
      state.categories.push(action.payload);

      state.categoryCount = state.categories.length;
      localStorage.setItem("categories", JSON.stringify(state.categories));
    },

    updateCategory(state, action) {
      const index = state.categories.findIndex(
        (category) => category.id === action.payload.id,
      );

      if (index !== -1) {
        state.categories[index] = action.payload;
      }
      localStorage.setItem("categories", JSON.stringify(state.categories));
    },

    deleteCategory(state, action) {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload,
      );
      state.categoryCount = state.categories.length;
      localStorage.setItem("categories", JSON.stringify(state.categories));
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
         state.categoryCount = state.categories.length;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const categoryActions = categorySlice.actions;
export default categorySlice.reducer;
