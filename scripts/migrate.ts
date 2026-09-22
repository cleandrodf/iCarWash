import "dotenv/config";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { closeDatabase, getDb } from "../server/db";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL é obrigatória para aplicar migrações.");
}

await migrate(getDb(), { migrationsFolder: "drizzle/migrations" });
await closeDatabase();
console.log("Migrações aplicadas com sucesso.");
