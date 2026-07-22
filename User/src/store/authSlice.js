import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticate: !!localStorage.getItem("token"),
  token: localStorage.getItem("token") || "",
  userId: localStorage.getItem("userId") || "",
};
const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers :{
        login(state, action){
            state.isAuthenticate = true;
            state.token = action.payload.token;
            state.userId = action.payload.userId;

            localStorage.setItem('token',action.payload.token);
            localStorage.setItem('userId',action.payload.userId);
        },

        logout(state){
            state.isAuthenticate = false;
            state.token = "",
            state.userId = "",

            localStorage.removeItem('token');
            localStorage.removeItem('userId');
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;