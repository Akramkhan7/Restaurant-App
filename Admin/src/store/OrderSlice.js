import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    orders : [],
}
const orderSlice = createSlice({
    name : 'order',
    initialState,
    reducers : {
        updateStatus(state,action){

        },

    }
})

export const orderActions = orderSlice.actions;
export default orderSlice.reducer;