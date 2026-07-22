import { createSlice } from "@reduxjs/toolkit";

const storedItems =
  JSON.parse(localStorage.getItem("cartItems")) || [];

const initialState = {
  items: storedItems,
  totalAmount: storedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  ),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;

      const existingItem = state.items.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...newItem,
          quantity: 1,
        });
      }

      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.items)
      );
    },

    increaseQuantity(state, action) {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item) {
        item.quantity += 1;
      }

      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.items)
      );
    },

    decreaseQuantity(state, action) {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (!item) return;

      if (item.quantity === 1) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload
        );
      } else {
        item.quantity -= 1;
      }

      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.items)
      );
    },

    removeFromCart(state, action) {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );

      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.items)
      );
    },

    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;

      localStorage.removeItem("cartItems");
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;