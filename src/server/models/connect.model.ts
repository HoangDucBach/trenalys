import {Client} from 'pg';
console.log(process.env.DB_USER);
export const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'trenalysdb',
    password: 'hoangbach02',
    port: 5432,
});
console.log(client);
client.connect().then(r => console.log('Connected to database')).catch(e => console.log(e));