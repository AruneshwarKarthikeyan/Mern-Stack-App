import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { users } from "../model/usermodel/userSchema.js";

// signup endpoint
export const register = async (req, res) => {
    try {
        const { name, email, password, confirmpassword } = req.body;
        const user = await users.findOne({ email }).exec();
        if (user) {
            return res.json({ error: "Email ID already exists!" });
        }
        if (password !== confirmpassword) {
            return res.json({ error: "Password mismatch" });
        }
        const hashedpassword = await bcrypt.hash(password, 10);
        await users.create({
            name,
            email,
            password: hashedpassword,
        })
        return res.json({ message: "User Created" });
    } catch (error) {
        console.log("Error in Signup Controller : " + error);
        return res.json({ error: "Internal server error" });
    }
}

// login endpoint
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await users.findOne({ email }).exec();
        if (!user) {
            return res.json({ error: "User didn't exists!" });
        }
        const verifyPassword = await bcrypt.compare(password, user.password);
        if (!verifyPassword) {
            res.json({ error: "Incorrect password!" });
        }
        const token = jwt.sign({ id: user._id, type: "user" }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
        res.cookie('user-token', token, {
            sameSite: "none",
            httpOnly: true,
            secure: true,
        });
        res.json(user);
    } catch (error) {
        console.log("Error in login Controller : " + error);
        res.json({ error: "Internal server error" });
    }
}

// logout endpoint
export const logout = (req, res) => {
    try {
        res.clearCookie('user_token', {
            sameSite: 'none',
            httpOnly: true,
            secure: true,
        });
        res.json({ message: "Logged out!" });
    } catch (error) {
        console.log("Error in logout Controller : " + error);
        res.json({ error: "Internal server error" });
    }
}

// profile updating endpoint
export const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, date, gender, door_no, street, town_or_city, district, state, country, pincode, profile } = req.body;
        const updatedUser = await users.findByIdAndUpdate(
            { _id: id },
            {
                $set: {
                    name,
                    email,
                    phone,
                    date,
                    gender,
                    profile,
                    'address.door_no': door_no,
                    'address.street': street,
                    'address.town_or_city': town_or_city,
                    'address.district': district,
                    'address.state': state,
                    'address.country': country,
                    'address.pincode': pincode,
                }
            },
            { new: true, runValidators: true }
        ).exec();
        if (updatedUser) {
            res.json({ message: "profile updated", user: updatedUser });
        } else {
            res.json({ error: "profile not found!" });
        }
    } catch (error) {
        console.log("Error in User Profile Update Controller : " + error);
        res.json({ error: "Internal server error" });
    }
}

// profile delete endpoint
export const deleteProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await users.findByIdAndDelete({ _id: id }).exec();
        if (user) {
            res.json({ message: "profile deleted" });
        } else {
            res.json({ error: "profile not found!" });
        }
    } catch (error) {
        console.log("Error in Profile Delete Controller : " + error);
        res.json({ error: "Internal server error" });
    }
}

