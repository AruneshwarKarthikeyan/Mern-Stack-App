import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import userRoutes from "./router/user.routes.js";
import adminRoutes from "./router/admin.routes.js";

const __dirname = path.resolve();
dotenv.config();
const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['https://mern-stack-app-nine.vercel.app', "http://localhost:5173"],
    headers: ['Content-Type', 'Authorization'],
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
}))
app.use(express.static(path.join(__dirname, "/frontend/dist")));


// routes
app.use('/api/user/', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(5000, () => {
    console.log("server started");
})

// database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => { console.log("connected to database") })
    .catch((error) => { console.log(error) });