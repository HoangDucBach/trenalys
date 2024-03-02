import {Pool, PoolClient, QueryResult} from 'pg';
import {config} from "../config";

require('dotenv-flow').config({
    node_env: config.NODE_ENV
});

class DatabaseManager {
    private static pool: Pool;
    private static instance: DatabaseManager;

    private constructor() {
        DatabaseManager.pool = new Pool({
            user: process.env.DATABASE_USER,
            host: process.env.DATABASE_HOST,
            database: process.env.DATABASE_NAME,
            password: process.env.DATABASE_PASSWORD,
            port: 5432,
            ssl: process.env.DATABASE_SSL === 'true',
        });
    }

    public async query(query: string, args?: any[]): Promise<QueryResult> {
        const client: PoolClient = await DatabaseManager.pool.connect();
        try {
            return client.query(query, args);
        } catch (error) {
            console.error('Error querying database:', error);
            throw error;
        } finally {
            client.release();
        }
    }

    public static getInstance(): DatabaseManager {
        if (!DatabaseManager.instance) {
            DatabaseManager.instance = new DatabaseManager();
        }
        return DatabaseManager.instance;
    }
}

export const databaseManager = DatabaseManager.getInstance();

export class client {
}