import {client, databaseManager} from "./connect.model";
import {QueryResult} from "pg";
import {TrendDatabaseStatus, UserDatabaseStatus} from "../controllers/status.controller";

const queryCreateTable = `
    CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    gmail VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    password VARCHAR(255)
);
`;

export class ElectionBallotManager {
    static async createElectionBallot(trendId: number, title: string): Promise<boolean> {
        const insertQuery = 'INSERT INTO election_ballots (trendId,title) VALUES ($1, $2)';
        const insertValues = [trendId, title];
        try {
            await databaseManager.query(insertQuery, insertValues);
        } catch (error) {
            console.error(error);
        }
        return true;
    }

    static async getElectionBallotById(id: string): Promise<any[]> {
        const query = 'SELECT * FROM election_ballots WHERE id = $1';
        const values = [id];
        try {
            const result: QueryResult = await databaseManager.query(query, values);
            return result.rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export class TrendManager {

    static async createTrend(trendTitle: string, trendDescription: string, trendTimeCreated: string, trendTags: string[]): Promise<boolean> {
        const insertQuery = 'INSERT INTO trends (name, description, timeCreated,tags) VALUES ($1, $2, $3,$4)';
        const insertValues = [trendTitle, trendDescription, trendTimeCreated, trendTags];
        try {
            const status = await databaseManager.query(insertQuery, insertValues);
            return true;
        } catch (error) {
            console.error('Error creating trend:', error);
            throw TrendDatabaseStatus.ERROR_TREND_CREATE;
        }
    }

    static async getTrendById(id: string): Promise<any> {
        const queryTrend = 'SELECT * FROM trends WHERE id = $1';
        const queryAllElectionBallots = 'SELECT * FROM election_ballots WHERE trendId = $1';
        const values = [id];

        try {
            const trendResult: QueryResult = await databaseManager.query(queryTrend, values);
            const electionBallotsResult: QueryResult = await databaseManager.query(queryAllElectionBallots, values);

            if (trendResult.rows.length === 0) {
                return [];
            }

            const trend = trendResult.rows[0];
            const electionBallots = electionBallotsResult.rows;

            return {
                ...trend,
                electionBallots: electionBallots
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getNextTrendId(): Promise<number> {
        const query = 'SELECT MAX(id) FROM trends';
        try {
            const result: QueryResult = await databaseManager.query(query);
            return result.rows[0].max + 1;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getAllTrends(): Promise<any[]> {
        // const query = 'SELECT * FROM trends';
        //
        // try {
        //     const result: QueryResult = await databaseManager.query(query);
        //     return result.rows;
        // } catch (error) {
        //     console.error(error);
        //     throw error;
        // }
        const queryAllTrendIds = 'SELECT id FROM trends';
        try {
            const result: QueryResult = await databaseManager.query(queryAllTrendIds);
            const trendIds = result.rows.map(row => row.id);
            const trends = [];
            for (const id of trendIds) {
                const trend = await this.getTrendById(id);
                trends.push(trend);
            }
            return trends;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
