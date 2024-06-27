import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    cities: null,
}

export const createCitySlice = createSlice({
    name: "createCity",
    initialState,
    reducers: {
        addCity: (state, action) => {
            state.cities = action.payload;
        }
    }
});

export const { addCity } = createCitySlice.actions;
export default createCitySlice.reducer;