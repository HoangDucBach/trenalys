import {config} from "dotenv";
import express from 'express';
import cors from 'cors';
import http from 'http';
import cookieParser from 'cookie-parser';
const app = express();
const port = process.env.PORT_SERVER || 8000;
const server = http.createServer(app);

config();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.get('/', (req, res) => {
    res.send('Hello TypeScript Express!');
});
server.listen(port);


