import { configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlice } from './services/apiSlice';
import cartSlice from './reducers/cartSlice';
import authSlice from './reducers/authSlice';
import stateSlice from './reducers/stateSlices';
import editSlice from './reducers/editSlice';


export const store = configureStore({
    reducer: {
        cart: cartSlice,
        auth: authSlice,
        states: stateSlice,
        edit: editSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(apiSlice.middleware),

});

setupListeners(store.dispatch);