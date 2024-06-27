import mongoose from "mongoose";

const createCitySchema = new mongoose.Schema({
    city_name: {
        type: String,
        default: null
    },
    city_description: {
        type: String,
        default: null
    },
    custom: {
        type: String,
        default: null
    }
});

export const cities = mongoose.model("cities", createCitySchema);