import {createSlice} from "@reduxjs/toolkit";

const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState: {
        userProfile: localStorage.getItem("userProfile")? JSON.parse(localStorage.getItem('userProfile')):[],
    },
    reducers: { 
        createUserProfile:(state, action) => {
            const newPerson = action.payload;
            state.userProfile.push({
                id : newPerson.id,
                firstName: newPerson.firstName,
                lastName: newPerson.lastName,
                email: newPerson.email,
                phoneNumber: newPerson.phoneNumber,
                country: newPerson.country,
                city: newPerson.city,
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