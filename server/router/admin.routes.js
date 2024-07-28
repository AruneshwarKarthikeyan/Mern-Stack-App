import express from "express";

const router = express.Router();

import {
    createAdmin,
    adminAuth,
    getUsers,
    adminLogout,
    addCity,
    getCity,
    deleteCity,
    updateCity,
    addState,
    getState,
    deleteState,
    updateState,
    addCountry,
    getCountry,
    deleteCountry,
    updateCountry,
} from '../controller/admin.controller.js';


// admin route
router.post('/create-admin', createAdmin);
router.post('/admin-auth', adminAuth);
router.get('/get-users', getUsers);
router.get('/admin-logout', adminLogout);
router.post('/create-city', addCity);
router.get('/get-cities', getCity);
router.delete('/delete-city/:id', deleteCity);
router.put('/update-city/:id', updateCity);
router.post('/create-state', addState);
router.get('/get-states', getState);
router.delete('/delete-state/:id', deleteState);
router.put('/update-state/:id', updateState);
router.post('/create-country', addCountry);
router.get('/get-countries', getCountry);
router.delete('/delete-country/:id', deleteCountry);
router.put('/update-country/:id', updateCountry);

export default router;