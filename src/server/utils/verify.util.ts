import nodemailer from 'nodemailer';
export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service: 'gmail',
    auth: {
        type: 'login',
        user: 'hoangbach0985@gmail.com',
        pass: 'rkmt daoz kezh kkcp',
    },
});
