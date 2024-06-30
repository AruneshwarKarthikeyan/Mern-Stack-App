import { admins } from "../model/adminmodel/adminSchema.js";
import { users } from "../model/usermodel/userSchema.js";
import { cities } from "../model/adminmodel/createCitySchema.js";

import jwt from "jsonwebtoken";

// admin creation endpoint
export const createAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await admins.findOne({ email }).exec();
        if (admin) {
            res.json({ message: "Admin already exists!" });
        }
        await admins.create({
            email,
            password
        })
        res.json({ message: "Admin Registered" });
    }
    catch (error) {
        console.log("Error in Admin Creation Controller : " + error);
        res.json({ error: "Internal server error!" });
    }
}

// admin auth(login) endpoint
export const adminAuth = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await admins.findOne({ email }).exec();
        if (!admin) {
            res.json({ error: "Admin Not Found!" });
        }
        if (password !== admin.password) {
            res.json({ error: "Invalid Password!" });
        }
        const token = jwt.sign({ id: admin.id, type: "admin" }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
        res.cookie('admin_token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        })
        res.json(admin);
    } catch (error) {
        console.log("Error in Admin Auth Controller : " + error);
        res.json({ error: "Internal server error!" });
    }
}

// admin users listing endpoint
export const getUsers = async (req, res) => {
    try {
        const userData = await users.find().exec();
        res.json(userData);
    } catch (error) {
        console.log("Error in Admin Get Users Controller : " + error);
        res.json({ error: "Internal server error!" });
    }
}

// admin logout endpoint
export const adminLogout = async (req, res) => {
    try {
        res.clearCookie('admin_token', {
            sameSite: 'none',
            secure: true,
            httpOnly: true
        });
        res.json({ message: "logged out" })
    } catch (error) {
        console.log("Error in Admin Logout Controller : " + error);
        res.json({ error: "Internal server error!" });
    }
}

//create city endpoint
export const addCity = async (req, res) => {
    try {
        const { city_name, city_description, custom } = req.body;
        const cityExisted = await cities.findOne({ city_name }).exec();
        if (cityExisted) {
            return res.json({ error: "city already added" });
        }

        await cities.create({
            city_name,
            city_description,
            custom
        })
        return res.json({ message: "city added" });

    } catch (error) {
        console.log("Error in create city Controller : " + error);
        res.json({ error: "Internal server error!" });
    }
}

// get cities endpoint

export const getCity = async (req, res) => {
    try {
        const allcities = await cities.find().exec();
        res.json(allcities);
    } catch (error) {
        console.log("Error in get city Controller : " + error);
        res.json({ error: "Internal server error!" });
    }
}

// delete city endpoint

export const deleteCity = async (req, res) => {
    try {
        const { id } = req.params;

        const city = await cities.findByIdAndDelete({ _id: id }).exec();
        if (city) {
            res.json({ message: "city deleted" });
        } else {
            res.json({ error: "city doesn't exists" });
        }
    } catch (error) {
        console.log("Error in delete city Controller : " + error);
        res.json({ error: "Internal server error!" });
    }
}

// update city endpoint 
export const updateCity = async (req, res) => {
    try {
        const { id } = req.params;
        const { city_name, city_description } = req.body;
        const updatedCity = await cities.findByIdAndUpdate(
            { _id: id },
            {
                $set: {
                    city_name,
                    city_description
                }
            },
            { new: true, runValidators: true }
        ).exec();

        if (updatedCity) {
            res.json({ message: "updated city" });
        }
        else {
            res.json({ error: "city not updated" });
        }
    } catch (error) {
        console.log("Error in update city Controller : " + error);
        res.json({ error: "Internal server error!" });
    }
}