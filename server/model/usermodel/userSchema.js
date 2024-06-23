import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: '',
    },
    email: {
        type: String,
        required: true,
        default: '',
    },
    phone: {
        type: Number,
        default: null
    },
    address: {
        door_no: {
            type: Number,
            default: null
        },
        street: {
            type: String,
            default: ""
        },
        town_or_city: {
            type: String,
            default: ""
        },
        district: {
            type: String,
            default: ""
        },
        state: {
            type: String,
            default: ""
        },
        country: {
            type: String,
            default: ""
        },
        pincode: {
            type: Number,
            default: null
        },
    },
    date: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        default: ''
    },
    profile: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        required: true,
    }
});

export const users = mongoose.model('users', userSchema);

