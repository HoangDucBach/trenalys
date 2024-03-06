import {MathUtil} from "../utils/math.util";
import {UserManager} from "../models/user.model";
import {transporter} from "../utils/verify.util";

import express from "express";
import {UserDatabaseStatus} from "../controllers/status.controller";

const router = express.Router();
router.post('/', async (req, res) => {
    const {gmail, password, confirmPassword} = req.body;
    const verificationCode = MathUtil.generateRandomNumber();
    switch (req.body.action) {
        case 'createUser':
            try {
                await UserManager.createUser(gmail, password, confirmPassword);
                res.status(200).json({
                    success: true,
                    title: 'Register successful !',
                    message: 'Login to experience now !',
                    data: {}
                });
            } catch (error) {
                if (error === UserDatabaseStatus.ERROR_EMAIL_EXISTS) {
                    res.status(401).json({
                        success: false,
                        title: 'Register failed !',
                        message: 'Email already exists',
                        data: {}
                    });
                }
                if (error === UserDatabaseStatus.ERROR_PASSWORD_MISMATCH) {
                    res.status(401).json({
                        success: false,
                        title: 'Register failed !',
                        message: 'Password does not match',
                        data: {}
                    });
                } else {
                    res.status(500).json({
                        success: false,
                        title: 'Register failed !',
                        message: 'Internal server error',
                        data: {}
                    });
                }
            }
            break;
        case 'sendCode':
            transporter.sendMail({
                from: process.env.EMAIL,
                to: gmail,
                subject: 'Trenalys Verification',
                text:
                    `Your verification code is: ${verificationCode}`,
            }, (error, info) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({
                        success: false,
                        message: 'Internal server error',
                    });
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.status(200).json({
                success: true,
                message: 'Verification code sent to your email',
                data: {
                    code: verificationCode
                }
            });
            break;
    }
});
export default router;