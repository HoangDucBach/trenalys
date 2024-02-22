import express from "express";
import {UserManager} from "../models/user.model";

const router = express.Router();
router.post('/', async (req, res) => {
    const {gmail, password} = req.body;
    console.log(gmail, password);
    console.log(req.body);

    try {
        const status = await UserManager.loginUser(gmail, password);
        if (status) {
            res.status(200).json({success: true, message: 'Login successful', data: {}});
        } else {
            res.status(401).json({success: false, message: 'Invalid credentials'});
        }
    } catch (error) {
        res.status(500).json({success: false, message: 'Internal server error'});
    }
});
export default router;