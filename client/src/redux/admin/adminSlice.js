import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentAdmin: null,
    isLoggedIn: false,
    users: null,
    user: null,
}

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        adminLoginStart: (state) => {
            state.currentAdmin = null;
            state.users = null;
        },
        adminLoginSuccess: (state, action) => {
            state.currentAdmin = action.payload;
            state.isLoggedIn = true;
        },
        adminLoginFailed: (state) => {
            state.currentAdmin = null;
        },
        adminPanelState: (state, action) => {
            state.users = action.payload;
        },
        adminUserUpdate: (state, action) => {
            state.user = action.payload;
        },
        adminLogoutSuccess: () => {
            return initialState;
        }
    }
});

export const { adminLoginStart, adminLoginSuccess, adminLoginFailed, adminPanelState, adminUserUpdate, adminLogoutSuccess } = adminSlice.actions;
export default adminSlice.reducer;