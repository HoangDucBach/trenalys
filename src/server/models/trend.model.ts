import {databaseManager} from "./connect.model";
import {QueryResult} from "pg";
import {ElectionBallot, Trend} from "../controllers/object.controller";

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
        const insertQuery = 'INSERT INTO election_ballots (trend_id,name) VALUES ($1, $2)';
        const insertValues = [trendId, title];
        try {
            await databaseManager.query(insertQuery, insertValues);
        } catch (error) {
            console.error(error);
        }
        return true;
    }

    static async getElectionBallotById(id: string): Promise<ElectionBallot> {
        const query = 'SELECT * FROM election_ballots WHERE id = $1';
        const values = [id];
        try {
            const result: QueryResult = await databaseManager.query(query, values);
            const ballot = result.rows[0];
            return new ElectionBallot(ballot);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export class TrendManager {
    static async createTrend(trendName: string, trendShortDescription: string, trendDescription: string, trendTimeCreated: string, trendTags: string[], maxVotes: number = 1): Promise<boolean> {
        const insertQuery = 'INSERT INTO trends (name, short_description,description, time_created,tags) VALUES ($1, $2, $3,$4,$5)';
        const insertValues = [trendName, trendShortDescription, trendDescription, trendTimeCreated, trendTags];
        try {
            await databaseManager.query(insertQuery, insertValues);
            return true;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async updateTrend(trend: Trend): Promise<boolean> {
        const query = 'UPDATE trends SET name = $1, short_description = $2, description = $3, time_created = $4, tags = $5 WHERE id = $6';
        const values = [trend.name, trend.shortDescription, trend.description, trend.timeCreated, trend.tags, trend.id];
        try {
            await databaseManager.query(query, values);
            return true;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getTrendById(id: string): Promise<Trend> {
        const queryTrend = 'SELECT * FROM trends WHERE id = $1';
        const queryAllElectionBallots = 'SELECT * FROM election_ballots WHERE trend_id = $1';
        const values = [id];

        try {
            const trendResult: QueryResult = await databaseManager.query(queryTrend, values);
            const electionBallotsResult: QueryResult = await databaseManager.query(queryAllElectionBallots, values);
            const trend = trendResult.rows[0];
            const electionBallots = electionBallotsResult.rows.map((row: any) => new ElectionBallot(row));
            return new Trend(trend).setElectionBallots(electionBallots);
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

    static async getAllTrends(): Promise<Trend[]> {
        const queryAllTrendIds = 'SELECT id FROM trends';
        try {
            const result: QueryResult = await databaseManager.query(queryAllTrendIds);
            const trendIds = result.rows.map(row => row.id);
            const trends: Trend[] = [];
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

    static async getTrendsFilterBy(filter: string): Promise<Trend[]> {
        const query = 'SELECT id FROM trends WHERE tags = $1';
        const values = [filter];
        try {
            const result: QueryResult = await databaseManager.query(query, values);
            const trendIds = result.rows.map(row => row.id);
            const trends: Trend[] = [];
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

    static async getTrendsOrderBy(order: string, direction: string = 'asc'): Promise<Trend[]> {
        const query = `SELECT id FROM trends ORDER BY ${order} ${direction}`;
        try {
            const result: QueryResult = await databaseManager.query(query);
            const trendIds = result.rows.map(row => row.id);
            const trends: Trend[] = [];
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
