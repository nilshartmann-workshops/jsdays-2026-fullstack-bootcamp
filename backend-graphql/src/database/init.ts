import { openDb, saveDb } from "./database";
import { seed } from "./seed";

export async function initDb(): Promise<void> {
  const db = await openDb();

  db.run(`
    CREATE TABLE IF NOT EXISTS authors (
      id TEXT PRIMARY KEY,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS addresses (
      id TEXT PRIMARY KEY,
      authorId TEXT NOT NULL UNIQUE,
      street TEXT NOT NULL,
      city TEXT NOT NULL,
      zip TEXT NOT NULL,
      country TEXT NOT NULL,
      FOREIGN KEY (authorId) REFERENCES authors(id) ON DELETE CASCADE
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS books (
      id TEXT PRIMARY KEY,
      authorId TEXT NOT NULL,
      title TEXT NOT NULL,
      isbn TEXT NOT NULL,
      pages INTEGER NOT NULL,
      year INTEGER NOT NULL,
      FOREIGN KEY (authorId) REFERENCES authors(id) ON DELETE CASCADE
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS comments (
      id TEXT PRIMARY KEY,
      bookId TEXT NOT NULL,
      name TEXT NOT NULL,
      text TEXT NOT NULL,
      rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
      createdAt TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (bookId) REFERENCES books(id) ON DELETE CASCADE
    );
  `);

  db.run("PRAGMA foreign_keys = ON;");

  // Seed only if empty
  const stmt = db.prepare("SELECT COUNT(*) as cnt FROM authors");
  stmt.step();
  const row = stmt.getAsObject() as { cnt: number };
  stmt.free();

  if (row.cnt === 0) {
    seed(db);
  }

  saveDb();
}
