import {databaseManager} from "./connect.model";
import {QueryResult} from "pg";
import {UserDatabaseStatus} from "../controllers/status.controller";
import {ElectionBallot, User} from "../controllers/object.controller";

export class UserManager {

    static async checkUserExist(gmail: string): Promise<boolean> {
        const checkGmailQuery = 'SELECT * FROM users WHERE gmail = $1';
        const checkGmailValues = [gmail];
        try {
            const gmailCheckResult = await databaseManager.query(checkGmailQuery, checkGmailValues);
            return gmailCheckResult.rows.length > 0;
        } catch (error) {
            console.error(error);
            throw error;
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
    static async changePassword(gmail: string, password: string): Promise<boolean> {
        const changePasswordQuery = 'UPDATE users SET password = $1 WHERE gmail = $2';
        const changePasswordValues = [password, gmail];
        try {
            await databaseManager.query(changePasswordQuery, changePasswordValues);
        } catch (error) {
            console.error(error);
        }
        return true;
    }
    static async userCheckElectionBallot(gmail: string, electionBallotId: string, isVoted: boolean): Promise<boolean> {
        const user = await this.getUserByGmail(gmail);
        const delta = isVoted ? 1 : -1;
        const query1 = isVoted ?
            `INSERT INTO user_vote_election_ballots (user_id, election_ballot_id) VALUES ($1, $2);` :
            `DELETE FROM user_vote_election_ballots WHERE user_id = $1 AND election_ballot_id = $2;`;
        const query2 = `UPDATE election_ballots SET number_of_votes = number_of_votes + $1 WHERE id = $2;`;
        const query3=`UPDATE trends SET number_of_votes = number_of_votes + $1 WHERE id = (SELECT trend_id FROM election_ballots WHERE id = $2);`
        const values1 = [user.id, electionBallotId];
        const values2 = [delta, electionBallotId];
        try {
            await databaseManager.query('BEGIN');
            await databaseManager.query(query1, values1);
            await databaseManager.query(query2, values2);
            await databaseManager.query(query3, values2);
            await databaseManager.query('COMMIT');
            return true;
        } catch (error) {
            await databaseManager.query('ROLLBACK');
            console.error(error);
            throw error;
        }
    }

    static async getUserByGmail(gmail: string): Promise<User> {
        const query = 'SELECT * FROM users WHERE gmail = $1';
        const values = [gmail];
        try {
            const result: QueryResult = await databaseManager.query(query, values);
            return new User(result.rows[0]);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getAllVotedElectionBallots(trendId: string, gmail: string): Promise<ElectionBallot[]> {
        try {
            const query = `
            SELECT eb.id
            FROM election_ballots eb
            INNER JOIN user_vote_election_ballots uv
                ON eb.id = uv.election_ballot_id
            WHERE eb.trend_id = $1 AND uv.user_id = $2;
        `;

            const user = await this.getUserByGmail(gmail);
            const values = [trendId, user.id];
            const result: QueryResult = await databaseManager.query(query, values);
            return result.rows.map((row: any) => new ElectionBallot(row));
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getAllUsers(): Promise<User[] | null> {
        const query = 'SELECT * FROM users';
        try {
            const result: QueryResult = await databaseManager.query(query);
            const users = result.rows;
            return users.map((user: any) => new User(user));
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getNumberOfUsers(): Promise<number> {
        const query = 'SELECT COUNT(*) FROM users';
        try {
            const result: QueryResult = await databaseManager.query(query);
            return result.rows[0].count;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}

// async function testUserFunctions() {
//     await UserManager.createUser('example@gmail.com', 'Example User', 'password123');
//     await UserManager.getAllUsers();
//     client.end().then(r => console.log('Disconnected from database'));
// }
//
