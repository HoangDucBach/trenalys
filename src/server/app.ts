import {config} from "dotenv";
import express from 'express';
import cors from 'cors';
import http from 'http';
import cookieParser from 'cookie-parser';
import {client} from "./models/connect.model";
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
app.get('/', (req, res) => {
    res.send('Hello TypeScript Express!');
    console.log(client);
});
server.listen(port);
