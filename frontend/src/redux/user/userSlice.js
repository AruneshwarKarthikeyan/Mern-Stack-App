import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.currentUser = null;
        },
        loginSuccess: (state, action) => {
            state.currentUser = action.payload;
        },
        loginFailed: (state) => {
            state.currentUser = null;
        },
        profileUpdated: (state, action) => {
            state.currentUser = action.payload;
        },
        logoutSuccess: () => {
            return initialState;
        },
    }
});

export const { loginStart, loginSuccess, loginFailed, profileUpdated, logoutSuccess } = userSlice.actions;
export default userSlice.reducer;