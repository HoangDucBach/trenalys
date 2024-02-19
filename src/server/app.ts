import {config} from "dotenv";
import express from 'express';
import cors from 'cors';
import http from 'http';
import cookieParser from 'cookie-parser';
import loginRoute from "./routes/login.route";
import registerRoute from "./routes/register.route";
export const app = express();
const port = process.env.PORT_SERVER || 8000;
config();
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.listen(port);