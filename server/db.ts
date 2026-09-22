import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "../drizzle/schema";

const { Pool } = pg;

let pool: pg.Pool | null = null;
let database: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function hasDatabaseConnection() {
  return Boolean(process.env.DATABASE_URL);
}

export function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL não configurada. Copie .env.example para .env e informe a conexão PostgreSQL.");
  }

  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 8,
    });
  }

  return pool;
}

export function getDb() {
  if (!database) {
    database = drizzle(getPool(), { schema });
  }

  return database;
}

export async function closeDatabase() {
  if (pool) {
    await pool.end();
    pool = null;
    database = null;
  }
}
