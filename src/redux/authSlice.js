import { createSlice } from "@reduxjs/toolkit";

// Define the initial state, loading user data from localStorage if available
const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
};

// Create an authentication slice with login and logout reducers
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Handles user login, updates state, and stores user data in localStorage
        login: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        // Handles user logout, clears state, and removes user data from localStorage
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("user");
        },
    },
});

// Export login and logout actions
export const { login, logout } = authSlice.actions;

// Export the reducer to be used in the store
export default authSlice.reducer;
