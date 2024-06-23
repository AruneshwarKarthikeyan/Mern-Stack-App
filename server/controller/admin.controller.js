import { admins } from "../model/adminmodel/adminSchema.js";
import { users } from "../model/usermodel/userSchema.js";
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
        const token = jwt.sign({ id: admin.id, name: "admin" }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
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
