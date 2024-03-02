import {databaseManager} from "./connect.model";
import {QueryResult} from "pg";
import {UserDatabaseStatus} from "../controllers/status.controller";

export class UserManager {

    static async checkUserExist(gmail: string): Promise<boolean> {
        const checkGmailQuery = 'SELECT * FROM users WHERE gmail = $1';
        const checkGmailValues = [gmail];
        try {
            const gmailCheckResult = await databaseManager.query(checkGmailQuery, checkGmailValues);
            return gmailCheckResult.rows.length > 0;
        } catch (error) {
            console.error('Error checking user:', error);
            throw UserDatabaseStatus.ERROR_EMAIL_EXISTS ;
        }
    }

    static async createUser(gmail: string, password: string, confirmPassword: string, name: string = 'user'): Promise<boolean> {
        const insertQuery = 'INSERT INTO users (gmail, name, password) VALUES ($1, $2, $3)';
        const insertValues = [gmail, name, password];
        if (await this.checkUserExist(gmail)) {
            throw UserDatabaseStatus.ERROR_EMAIL_EXISTS;
        }

        if (password !== confirmPassword) {
            throw UserDatabaseStatus.ERROR_PASSWORD_MISMATCH;
        }
        try {
            await databaseManager.query(insertQuery, insertValues);
        } catch (error) {
            console.error(error);
        }
        return true;
    }

    static async loginUser(gmail: string, password: string): Promise<boolean> {
        const loginQuery = 'SELECT * FROM users WHERE gmail = $1 AND password = $2';
        const loginValues = [gmail, password];
        try {
            const loginResult = await databaseManager.query(loginQuery, loginValues);
            return loginResult.rows.length > 0;
        } catch (error) {
            console.error(error);
        }
        return false;
    }

    static async getUserByGmail(gmail: string): Promise<any> {
        const query = 'SELECT * FROM users WHERE gmail = $1';
        const values = [gmail];
        try {
            const result: QueryResult = await databaseManager.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error(error);
        }
    }

    static async getAllVotedElectionBallots(trendId: string, gmail: string): Promise<any> {
        const user= await this.getUserByGmail(gmail);
        try {
            const query = `
            SELECT eb.id
            FROM election_ballots eb
            INNER JOIN user_vote_election_ballots uv
                ON eb.id = uv.electionBallotId
            WHERE eb.trendId = $1 AND uv.userId = $2;
        `;
            const values = [trendId, user.id];
            const result: QueryResult = await databaseManager.query(query, values);
            return result.rows;
        } catch (error) {
            console.error(error);
        }
    }

    static async getAllUsers(): Promise<void> {
        const query = 'SELECT * FROM users';

        try {
            const result: QueryResult = await databaseManager.query(query);
            const users = result.rows;

            console.log('All users:', users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }


}

// async function testUserFunctions() {
//     await UserManager.createUser('example@gmail.com', 'Example User', 'password123');
//     await UserManager.getAllUsers();
//     client.end().then(r => console.log('Disconnected from database'));
// }
//
