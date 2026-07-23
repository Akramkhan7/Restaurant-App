import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const db_url = import.meta.env.VITE_DATABASE_URL;

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${db_url}/categories.json`);

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      const data = await response.json();

      const loadedCategories = [];

      if (data) {
        for (const key in data) {
          loadedCategories.push({
            id: key,
            ...data[key],
          });
        }
      }

      return loadedCategories;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const categorySlice = createSlice({
  name: "category",

  initialState: {
    categories: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
export const categoryActions = categorySlice.actions;