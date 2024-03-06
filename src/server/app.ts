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

app.use(cors({
    origin: function (origin, callback) {
        if(!origin) return callback(null, true);
        if (['https://trenalys.vercel.app', 'https://trenalys.io.vn'].indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
}));
console.log(process.env.URL_CLIENT);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use('/', globalRoute);
app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/dashboard', dashboardRoute);
app.listen(port);