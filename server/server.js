import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connect_to_mongo_db from "./config/connectDB.js";

import userRoutes from "./router/user.routes.js";
import adminRoutes from "./router/admin.routes.js";

dotenv.config();
const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['https://mern-stack-app-web.netlify.app', "http://localhost:5173"],
    headers: ['Content-Type', 'Authorization'],
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
}))

// routes
app.get('/', (req, res) => {
    res.json("server running");
})
app.use('/api/user/', userRoutes);
app.use('/api/admin', adminRoutes);

app.listen(5000, () => {
    console.log("server started on port: " + 5000);
    connect_to_mongo_db();
})
