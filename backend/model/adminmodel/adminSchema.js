import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        default: null
    },
    password: {
        type: String,
        default: null
    }
});

export const admins = mongoose.model('admins', adminSchema);

