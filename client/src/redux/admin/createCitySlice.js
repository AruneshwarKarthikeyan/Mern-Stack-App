import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    cities: [],
}

export const createCitySlice = createSlice({
    name: "createCity",
    initialState,
    reducers: {
        addCity: (state, action) => {
            state.cities.push(action.payload.city);
        }
    }
});

export const { addCity } = createCitySlice.actions;
export default createCitySlice.reducer;