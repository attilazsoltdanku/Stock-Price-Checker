import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import dotenv from "dotenv";
import * as schema from "./schema";

dotenv.config();

const { Client, Pool } = pg;

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not set");

console.info("[DB]: client", connectionString?.split("@")[1]);

export const client = new Client({
  connectionString
});

const pool = new Pool({
  connectionString
});

export const db = drizzle(pool, { schema });
