import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export const getProduct = createAsyncThunk('product/getProduct',async ()=>{
    return await (await publicRequest.get('/products/'))
   });


const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        status: "idle",
        error: ""
    },
    reducers: {
        addProducts: (state, action) => {
            state.products.push(action.payload);
        }
    },
    extraReducers(builder) {
        builder
          .addCase(getProduct.pending, (state) => {
            state.status = 'loading'
          })
          .addCase(getProduct.fulfilled, (state, action) => {
            state.status = 'succeeded'
            // Add any fetched busses to the array
            state.products = state.products.concat(action.payload)
          })
          .addCase(getProduct.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
          })
      }
})
export default productSlice.reducer;