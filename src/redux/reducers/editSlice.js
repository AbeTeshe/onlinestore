import {createSlice} from "@reduxjs/toolkit";

const editSlice = createSlice({
    name: "edit",
    initialState: {
        productEditId: null,
        profileEditId: null,
    },
    reducers: {
        setProductEditId: (state, action) => {
            state.productEditId = action.payload;
        },
        setProfileEditId: (state, action) => {
            state.profileEditId = action.payload;
        },
        resetProductEditId: (state) => {
            state.productEditId = null;
        },
        resetProfileEditId: (state) => {
            state.profileEditId = null;
        }
    }
});

export const {setProductEditId, setProfileEditId, resetProductEditId, resetProfileEditId} = editSlice.actions;

export default editSlice.reducer;