import initSqlJs, { Database } from "sql.js";
import fs from "fs";
import path from "path";

let db: Database;
const DB_PATH =
  process.env.DB_PATH?.trim() || path.join(__dirname, "..", "..", "data.db");

export async function openDb(): Promise<Database> {
  if (!db) {
    const SQL = await initSqlJs();
    if (fs.existsSync(DB_PATH)) {
      const buffer = fs.readFileSync(DB_PATH);
      db = new SQL.Database(buffer);
    } else {
      db = new SQL.Database();
    }
  }
  return db;
}

export function getDb(): Database {
  if (!db) {
    throw new Error("Database not initialized. Call openDb() first.");
  }
  return db;
}

export function saveDb(): void {
  if (db) {
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(DB_PATH, buffer);
  }
}
