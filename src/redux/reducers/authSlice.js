import { createSlice } from "@reduxjs/toolkit";


 const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authData: localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : null,
        isGoogleLoginIn: false,
    },
    reducers: {
        loginWithGoogle: (state, action) => {
            localStorage.setItem('profile', JSON.stringify(action?.payload));
            state.authData = action?.payload;
            state.isGoogleLoginIn = true;
        },
        login: (state, action) => {
            localStorage.setItem('profile', JSON.stringify(action.payload));
            state.authData = action.payload;
            state.isGoogleLoginIn = false;
        },
        register: (state, action) => {
            localStorage.setItem('profile', JSON.stringify(action.payload));
            state.authData = action.payload;
            state.isGoogleLoginIn = false;
        },
        logout: (state) => {
            state.authData = null,
            state.isGoogleLoginIn = false;
            localStorage.clear();
        }
    }
});


export const {loginWithGoogle, login, register, logout} = authSlice.actions;

export default authSlice.reducer;

