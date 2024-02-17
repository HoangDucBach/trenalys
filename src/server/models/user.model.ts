import {client} from "./connect.model";
import {QueryResult} from "pg";

const queryCreateTable = `
    CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    password VARCHAR(255)
);
`;
client.query(queryCreateTable, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Table is successfully created');
});

export class UserManager {
    static async createUser(email: string, name: string, password: string): Promise<void> {
        const checkEmailQuery = 'SELECT * FROM users WHERE email = $1';
        const checkEmailValues = [email];

        try {
            const emailCheckResult = await client.query(checkEmailQuery, checkEmailValues);

            if (emailCheckResult.rows.length > 0) {
                console.log('Email already exists. Cannot create user.');
                return;
            }
            const insertQuery = 'INSERT INTO users (email, name, password) VALUES ($1, $2, $3)';
            const insertValues = [email, name, password];

            await client.query(insertQuery, insertValues);
            console.log('User created successfully');
        } catch (error) {
            console.error('Error creating user:', error);
        }
    }

    static async getAllUsers(): Promise<void> {
        const query = 'SELECT * FROM users';

        try {
            const result: QueryResult = await client.query(query);
            const users = result.rows;

            console.log('All users:', users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }
    static async loginUser(email: string, password: string): Promise<boolean> {
        const loginQuery = 'SELECT * FROM users WHERE email = $1 AND password = $2';
        const loginValues = [email, password];

        try {
            const loginResult = await client.query(loginQuery, loginValues);
            return loginResult.rows.length > 0;
        } catch (error) {
            throw error;
        }
    }
}

async function testUserFunctions() {
    await UserManager.createUser('example@email.com', 'Example User', 'password123');
    await UserManager.getAllUsers();
    client.end().then(r => console.log('Disconnected from database'));
}

