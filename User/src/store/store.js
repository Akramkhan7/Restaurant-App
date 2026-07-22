import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import categoryReducer from './categorySlice';
import recipeReducer from "./recipeSlice";
import cartReducer from "./cartSlice";


const store = configureStore({
    reducer :{
        auth : authReducer,
        category : categoryReducer,
        recipe: recipeReducer,
        cart: cartReducer,
    }
})

export default store;