import {MathUtil} from "../utils/math.util";
import {UserManager} from "../models/user.model";
import {transporter} from "../utils/verify.util";

import express from "express";

const router = express.Router();
router.post('/', async (req, res) => {
    const {gmail, password} = req.body;
    const verificationCode = MathUtil.generateRandomNumber();
    switch (req.body.action) {
        case 'createUser':
            try {
                await UserManager.createUser(gmail, password);
                res.status(200).json({success: true, message: 'User created successfully', data: {}});
            } catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Internal server error',
                    status: error
                });
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
                        status: error
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