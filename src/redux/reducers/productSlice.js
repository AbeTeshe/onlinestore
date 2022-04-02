import {createSlice} from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
  },
  reducers: {
    getProducts: (state, action) => {
      state.products = action.payload;
    },
    getSingleProduct: (state, action) => {
      state.products = action.payload;
    },
    updateProduct:(state,action) => {
      state.products[state.products.findIndex((item) => item._id === action.payload.id)]
                = action.payload.products;
   },

    deleteProduct: (state,action) =>{
      state.products.splice (
        state.products.findIndex((item) => item._id === action.payload.id), 1
    );
    },

     addNewProduct: (state, action) => {
      state.products.push(action.payload);
    }
  }
  });
  export const {
    updateProduct,
    deleteProduct,
    addProduct,
    getProducts,
    getSingleProduct
  } = productSlice.actions;

  export default productSlice.reducer;