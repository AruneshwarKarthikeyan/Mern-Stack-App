import mongoose from "mongoose";

const stateSchema = new mongoose.Schema({
    state_name: {
        type: String,
        default: null
    },
    state_description: {
        type: String,
        default: null
    },
    custom: {
        type: String,
        default: null
    }
});

export const states = mongoose.model("states", stateSchema);