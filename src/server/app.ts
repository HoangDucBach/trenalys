import {config} from "dotenv";
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import loginRoute from "./routes/login.route";
import registerRoute from "./routes/register.route";
import {configEnvironment} from "./config";
import dashboardRoute from "./routes/dashboard.route";
import globalRoute from "./routes/global.route";
import path from "path";
export const app = express();
config({path: path.resolve(__dirname, `./.env.${configEnvironment.PATH_CONFIG_ENV}`)});
const port = process.env.PORT || 8000;
app.use(cors({
    origin: process.env.URL_CLIENT,
    credentials: true,
}));
console.log(app.get('env'));
console.log(process.env.URL_CLIENT);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use('/', globalRoute);
app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/dashboard', dashboardRoute);
app.listen(port);