import { configureStore } from '@reduxjs/toolkit';
import mainSlice from './mainSlice';
import cartSlice from './cartSlice';
import authSlice from './authSlice';
import userProfileSlice from './userProfileSlice'
// import { profileApi } from './apis/profileApi';
// import { productApi } from './apis/productApi';

export const store = configureStore({
    reducer: {
        main: mainSlice,
        cart: cartSlice,
        auth: authSlice,
        userProfile: userProfileSlice,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({ serializableCheck: false })
});