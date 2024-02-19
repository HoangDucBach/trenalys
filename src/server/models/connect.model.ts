import {Client} from 'pg';
console.log(process.env.DB_USER);
require('dotenv').config();
export const client = new Client({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: 5432,
    ssl: true
});
console.log(client);
client.connect().then(r => console.log('Connected to database')).catch(e => console.log(e));