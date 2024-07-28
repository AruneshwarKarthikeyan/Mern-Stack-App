import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    isLocationPopupVisible: false,
}

export const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        showLocationWindow: (state) => {
            state.isLocationPopupVisible = true;
        },
        hideLocationWindow: (state) => {
            state.isLocationPopupVisible = false;
        },
    }
});

export const { showLocationWindow, hideLocationWindow } = locationSlice.actions;
export default locationSlice.reducer;