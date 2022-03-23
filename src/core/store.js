import { configureStore } from '@reduxjs/toolkit';
import mainSlice from './mainSlice';

// import { profileApi } from './apis/profileApi';
// import { productApi } from './apis/productApi';

export const store = configureStore({
    reducer: {
        main: mainSlice,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({ serializableCheck: false })
});