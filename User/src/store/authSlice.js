import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticate: !!localStorage.getItem("token"),
  token: localStorage.getItem("token") || "",
  userId: localStorage.getItem("userId") || "",
  email: localStorage.getItem("email") || "",
  username: localStorage.getItem("username") || "",
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.isAuthenticate = true;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", action.payload.userId);
      localStorage.setItem("email", action.payload.email);
    },

    logout(state) {
      state.isAuthenticate = false;
      ((state.token = ""), (state.userId = ""), (state.email = ""));

      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("email");
      localStorage.removeItem("username");
    },
    setName(state, action) {
      state.username = action.payload;
      localStorage.setItem("username", action.payload);
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
