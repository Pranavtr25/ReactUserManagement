import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAdminLoggedIn : false
}

const adminSlice = createSlice({
    name : 'admin',
    initialState,
    reducers : {
        adminSignIn : (state) => {
            state.isAdminLoggedIn = true
        },
        adminLogout : (state) => {
            state.isAdminLoggedIn = false
        }
    }
})

export const {adminSignIn, adminLogout} = adminSlice.actions;

export default adminSlice.reducer