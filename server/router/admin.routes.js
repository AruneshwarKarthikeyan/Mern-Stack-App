import express from "express";

const router = express.Router();

import {
    createAdmin,
    adminAuth,
    getUsers,
    adminLogout
} from '../controller/admin.controller.js';


// admin route
router.post('/create-admin', createAdmin);
router.post('/admin-auth', adminAuth);
router.get('/get-users', getUsers);
router.get('/admin-logout', adminLogout);

export default router;