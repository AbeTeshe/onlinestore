import {createSlice} from "@reduxjs/toolkit";
import {ipfsURL} from '../components/IPFS/ipfsURL.js';
import {dummyProducts } from './dummyProducts';
const initialMainState = {
  products: dummyProducts,
  isAdmin: false,
};


export const mainSlice = createSlice({

  name: "main",
  initialState: initialMainState,
  reducers: {

    createProduct: (state,action) => {
      // const formattedPrice = action.payload.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      state.products = action.payload;  
      for(let i = 0; i < state.products.length; i++){
      state.products[i].price = action.payload[i].price.formatted_with_symbol;  
      state.products[i].ipfsURL = ipfsURL.products[i].ipfsURL;
      } 
    },

    updateProduct:(state,action) => {
      const foundIndex = state.products.findIndex(product => product.id === action.payload.id);
      state.products[foundIndex][action.payload.name] = action.payload.value;
   },

    deleteProduct: (state,action) =>{
      const foundIndex = state.products.findIndex(product => product.id === action.payload);
      delete state.products[foundIndex];
      state.products.splice(foundIndex,1);
  
    },

     addNewProduct: (state, action) => {
      state.products.push(action.payload);
    },
    getProducts: (state, action) => {
      state.products = action.payload;
    }
  }
  });
  export const {
    createProduct,
    updateProduct,
    deleteProduct,
    getProductList,
    getProducts
  } = mainSlice.actions;

  export default mainSlice.reducer;