import { createSlice } from "@reduxjs/toolkit";


 const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authData: localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : null,
    },
    reducers: {
        login: (state, action) => {
            const {result, token} = action?.payload;
            localStorage.setItem('profile', JSON.stringify(action?.payload));
            state.authData = action?.payload;
        },
        logout: (state) => {
            state.authData = null,
            localStorage.removeItem('profile');
        }
    }
});

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;

