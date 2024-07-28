import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
    country_name: {
        type: String,
        default: null
    },
    country_description: {
        type: String,
        default: null
    },
    custom: {
        type: String,
        default: null
    }
});

export const countries = mongoose.model("countries", countrySchema);