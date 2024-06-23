import express from "express";

const router = express.Router();

import {
    register,
    login,
    logout,
    updateProfile,
    deleteProfile,
} from '../controller/user.controller.js';

// user routes
router.post('/signup', register);
router.post('/login', login);
router.get('/logout', logout);
router.put('/update-profile/:id', updateProfile);
router.delete('/profile-delete/:id', deleteProfile);

export default router;
