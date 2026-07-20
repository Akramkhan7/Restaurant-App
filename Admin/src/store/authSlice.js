import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: !!localStorage.getItem("token"),
  token: localStorage.getItem("token") || "",
  userId: localStorage.getItem("userId") || "",
};
const authAction = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", action.payload.userId);
    },

    logout(state, action) {
      state.isAuthenticated = false;
      state.token = "";
      state.userId = "";

      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    },
  },
});

export const authActions = authAction.actions;
export default authAction.reducer;
