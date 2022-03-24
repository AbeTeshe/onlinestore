import { configureStore } from '@reduxjs/toolkit';
import mainSlice from './mainSlice';
import cartSlice from './cartSlice';
// import { profileApi } from './apis/profileApi';
// import { productApi } from './apis/productApi';

export const store = configureStore({
    reducer: {
        main: mainSlice,
        cart: cartSlice,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({ serializableCheck: false })
});