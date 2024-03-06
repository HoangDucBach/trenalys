import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import loginRoute from "./routes/login.route";
import registerRoute from "./routes/register.route";
import {config} from "./config";
import dashboardRoute from "./routes/dashboard.route";
import globalRoute from "./routes/global.route";
import path from "path";

export const app = express();
const port = process.env.PORT || 8000;
require('dotenv-flow').config({
    node_env: config.NODE_ENV
});

const allowList = ['https://trenalys.vercel.app', 'https://trenalys.io.vn'];
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", req.headers.origin);
//     res.header("Access-Control-Allow-Credentials", "true");
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization");
//     next();
// });
const whitelist = ['https://trenalys.vercel.app', 'https://trenalys.io.vn']
const corsOptions = {
    origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
        if (whitelist.indexOf(origin !== undefined ? origin : '') !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use('/', globalRoute);
app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/dashboard', dashboardRoute);
app.listen(port);