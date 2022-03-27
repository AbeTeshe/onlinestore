import {createSlice} from "@reduxjs/toolkit";

const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState: {
        userProfile: localStorage.getItem("userProfile")? JSON.parse(localStorage.getItem('userProfile')):[],
    },
    reducers: {
        createUserProfile:(state, action) => {
            state.userProfile.push({
                id,
                firstName,
                lastName,
                email,
                phoneNumber,
                country,
                city
            });
            localStorage.setItem('userProfile', JSON.stringify(state.userProfile));
        },
        deleteUserProfile:(state, action) =>  {
            state.userProfile = state.userProfile.filter((user) => user.id === action.payload);
            localStorage.setItem('userProfile', JSON.stringify(state.userProfile));
        },
        updateUserProfile: (state, action) => {
            state.userProfile[state.userProfile.find((user) => user.id ===action.payload.id)] = action.payload.userProfile;
            localStorage.setItem('userProfile', JSON.stringify(state.userProfile));
        },
        getUserProfile: (state) => {
            state.userProfile = localStorage.getItem('userProfile', JSON.stringify(state.userProfile));
        }
    }
});

export const {createUserProfile, deleteUserProfile, updateUserProfile, getUserProfile} = userProfileSlice.actions;
export default userProfileSlice.reducer;