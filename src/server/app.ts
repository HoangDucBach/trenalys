import {config} from "dotenv";
import express from 'express';
import cors from 'cors';
import http from 'http';
import cookieParser from 'cookie-parser';
import {client} from "./models/connect.model";
import {UserManager} from "./models/user.model";
export const app = express();
const port = process.env.PORT_SERVER || 8000;
const server = http.createServer(app);

config();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.get('/', async (req, res) => {
    const {username, password} = req.body;
    try {

        const status = await UserManager.loginUser(username, password);
        if (status) {
            res.status(200).json({success: true, message: 'Login successful', data: {}});
        } else {
            res.status(401).json({success: false, message: 'Invalid credentials'});
            ;
        }
    } catch (error) {
        res.status(500).json({success: false, message: 'Internal server error'});
    }
});
server.listen(port);
