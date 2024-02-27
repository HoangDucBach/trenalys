import {client} from "./connect.model";
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

export class TrendManager {

    static async createTrend(trendTitle: string, trendDescription: string, trendTimeCreated: string, trendTags: string[]): Promise<boolean> {
        const insertQuery = 'INSERT INTO trends (name, description, timeCreated,tags) VALUES ($1, $2, $3,$4)';
        const insertValues = [trendTitle, trendDescription, trendTimeCreated, trendTags];
        try {
            await client.query(insertQuery, insertValues);
        } catch (error) {
            console.error('Error creating trend:', error);
            throw TrendDatabaseStatus.ERROR_TREND_CREATE;
        }
        return true;
    }

    static async getAllTrends(): Promise<any[]> {
        const query = 'SELECT * FROM trends';

        try {
            const result: QueryResult = await client.query(query);
            return result.rows;
        } catch (error) {
            console.error('Error getting all trends:', error);
            throw error;
        }
    }
}


