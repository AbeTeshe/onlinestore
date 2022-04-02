import { configureStore } from '@reduxjs/toolkit';
import productSlice from './reducers/productSlice';
import cartSlice from './reducers/cartSlice';
import authSlice from './reducers/authSlice';
import userProfileSlice from './reducers/userProfileSlice'


export const store = configureStore({
    reducer: {
        product: productSlice,
        cart: cartSlice,
        auth: authSlice,
        userProfile: userProfileSlice,
    },
});