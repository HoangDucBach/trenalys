import {Client} from 'pg';
import {configEnvironment} from "../config";

require('dotenv').config({path: `/.env.${configEnvironment.PATH_CONFIG_ENV}`});
export const client = new Client({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: 5432,
    ssl: {rejectUnauthorized: false}
});
console.log(client);
client.connect().then(r => console.log('Connected to database')).catch(e => console.log(e));