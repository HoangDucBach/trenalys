import {client} from "./connect.model";
import {QueryResult} from "pg";
import {UserDatabaseStatus} from "../controllers/status.controller";

const queryCreateTable = `
    CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    gmail VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    password VARCHAR(255)
);
`;

export class UserManager {

    static async checkUserExist(gmail: string): Promise<boolean> {
        const checkGmailQuery = 'SELECT * FROM users WHERE gmail = $1';
        const checkGmailValues = [gmail];

        try {
            const gmailCheckResult = await client.query(checkGmailQuery, checkGmailValues);
            return gmailCheckResult.rows.length > 0;
        } catch (error) {
            console.error('Error checking user:', error);
            throw UserDatabaseStatus.ERROR_EMAIL_EXISTS ;
        }
    }

    static async createUser(gmail: string, password: string, name: string = 'user'): Promise<boolean> {
        const insertQuery = 'INSERT INTO users (gmail, name, password) VALUES ($1, $2, $3)';
        const insertValues = [gmail, name, password];

        try {
            if (await this.checkUserExist(gmail)) {
                return false;
            }
            await client.query(insertQuery, insertValues);
        } catch (error) {
            console.error('Error creating user:', error);
            throw UserDatabaseStatus.ERROR_EMAIL_EXISTS;
        }
        return true;
    }

    static async loginUser(gmail: string, password: string): Promise<boolean> {
        const loginQuery = 'SELECT * FROM users WHERE gmail = $1 AND password = $2';
        const loginValues = [gmail, password];

        try {
            const loginResult = await client.query(loginQuery, loginValues);
            return loginResult.rows.length > 0;
        } catch (error) {
            throw UserDatabaseStatus.ERROR_USER_LOGIN;
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


}

async function testUserFunctions() {
    await UserManager.createUser('example@gmail.com', 'Example User', 'password123');
    await UserManager.getAllUsers();
    client.end().then(r => console.log('Disconnected from database'));
}

