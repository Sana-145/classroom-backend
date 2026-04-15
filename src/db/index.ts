import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL;

if(!databaseUrl) {
    throw new Error("DATABASE_URL environment variable doesn't exist");
}

const sql = neon(databaseUrl);
export const db = drizzle(sql);

