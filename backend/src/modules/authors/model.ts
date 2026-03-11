import { getDb, saveDb } from "../../database/database";
import { v4 as uuidv4 } from "uuid";
import { Author, CreateAuthor, UpdateAuthor } from "./validation-schema";

function rowToAuthor(row: Record<string, any>): Author {
  return {
    id: row.id as string,
    firstName: row.firstName as string,
    lastName: row.lastName as string,
  };
}

export function getAll(): Author[] {
  const db = getDb();
  const stmt = db.prepare("SELECT * FROM authors");
  const authors: Author[] = [];
  while (stmt.step()) {
    authors.push(rowToAuthor(stmt.getAsObject()));
  }
  stmt.free();
  return authors;
}

export function getById(id: string): Author | undefined {
  const db = getDb();
  const stmt = db.prepare("SELECT * FROM authors WHERE id = ?");
  stmt.bind([id]);
  if (stmt.step()) {
    const author = rowToAuthor(stmt.getAsObject());
    stmt.free();
    return author;
  }
  stmt.free();
  return undefined;
}

export function create(data: CreateAuthor): Author {
  const db = getDb();
  const id = uuidv4();
  db.run("INSERT INTO authors (id, firstName, lastName) VALUES (?, ?, ?)", [
    id,
    data.firstName,
    data.lastName,
  ]);
  saveDb();
  return { id, ...data };
}

export function update(id: string, data: UpdateAuthor): Author | undefined {
  const existing = getById(id);
  if (!existing) return undefined;

  const updated = { ...existing, ...data };
  const db = getDb();
  db.run("UPDATE authors SET firstName = ?, lastName = ? WHERE id = ?", [
    updated.firstName,
    updated.lastName,
    id,
  ]);
  saveDb();
  return updated;
}

export function remove(id: string): boolean {
  const db = getDb();
  db.run("DELETE FROM authors WHERE id = ?", [id]);
  const changes = db.getRowsModified();
  if (changes > 0) saveDb();
  return changes > 0;
}
