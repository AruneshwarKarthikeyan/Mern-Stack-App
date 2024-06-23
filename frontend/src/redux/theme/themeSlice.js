import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isThemeVisible: false,
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        showThemeWindow: (state) => {
            state.isThemeVisible = true;
        },
        hideThemeWindow: (state) => {
            state.isThemeVisible = false;
        }
    }
});

export const { showThemeWindow, hideThemeWindow } = themeSlice.actions;
export default themeSlice.reducer;