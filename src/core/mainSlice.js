import {createSlice} from "@reduxjs/toolkit";
import {ipfsURL} from '../components/IPFS/ipfsURL.js'
const initialMainState = {
  products: [],
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
     
    
      // delete state.products[removingProduct];
      // state.products.splice(foundIndex,1);
    },

     addNewProduct: (state, action) => {
      console.log("addNewProduct");
    },
  }
  });
  export const {
    createProduct,
    updateProduct,
    deleteProduct,
    getProductList
  } = mainSlice.actions;

  export default mainSlice.reducer;