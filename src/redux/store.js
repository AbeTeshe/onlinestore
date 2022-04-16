import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import productSlice from './reducers/productSlice';
import cartSlice from './reducers/cartSlice';
import authSlice from './reducers/authSlice';
import userProfileSlice from './reducers/userProfileSlice';
import orderSlice from './reducers/orderSlice';
import stateSlice from './reducers/stateSlices';
import { productApi } from './services/productApi';


export const store = configureStore({
    reducer: {
        product: productSlice,
        cart: cartSlice,
        auth: authSlice,
        userProfile: userProfileSlice,
        order: orderSlice,
        states: stateSlice,
        [productApi.reducerPath]: productApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(productApi.middleware),

});