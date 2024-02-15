import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    admin: null,
    token: null,
    error: false,
};

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        adminloginSuccess: (state, action) => {
            state.admin = action.payload.admin;
            state.error = false;
            state.token = action.payload.token;
        },
        adminloginFailed: (state) => {
            state.error = true;
        },
        adminlogout: (state) => {
            state.admin = null;
            state.error = false;
            state.token = null;
        },
    },
});

// Action creators are generated for each case reducer function
export const { adminloginSuccess, adminloginFailed, adminlogout } =
    adminSlice.actions;

export default adminSlice.reducer;
