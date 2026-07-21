import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import categoryReducer from "./CategorySlice";
import recipeReducer from "./RecipeSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    category : categoryReducer,
   recipe: recipeReducer,
  },
});

export default store;
