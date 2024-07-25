import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn : false
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        signIn : (state, action) => {
            state.isLoggedIn = true
        },
        logOut : (state) => {
            state.isLoggedIn = false
        }
    }
})

export const {signIn, logOut} = userSlice.actions;

export default userSlice.reducer