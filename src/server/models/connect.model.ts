import {Client} from 'pg';
import {config} from "../config";
require('dotenv-flow').config({
    node_env: config.NODE_ENV
});

export const client = new Client({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: 5432,
    ssl: process.env.DATABASE_SSL==='true'
});
console.log(process.env.DATABASE_HOST);

client.connect().then(r => console.log('Connected to database')).catch(e => console.log(e));