import express from "express";
import {UserManager} from "../models/user.model";
import {app} from "../app";
import {transporter} from "../utils/verify.util";
import {MathUtil} from "../utils/math.util";

const router = express.Router();
router.post('/', async (req, res) => {
    const {gmail, password} = req.body;
    console.log(gmail, password);
    console.log(req.body);
    // transporter.sendMail({
    //
    //     from: process.env.EMAIL,
    //     to: gmail,
    //     subject: 'Trenalys Verification',
    //     text:
    //         `Hello, this is a test email from Trenalys
    //         Your verification code is: bachananh`,
    // }, (error, info) => {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log('Email sent: ' + info.response);
    //     }
    // });
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