import { getDb, saveDb } from "../../database/database";
import { v4 as uuidv4 } from "uuid";
import { Book, CreateBook, UpdateBook } from "./validation-schema";

function rowToBook(row: Record<string, any>): Book {
  return {
    id: row.id as string,
    authorId: row.authorId as string,
    title: row.title as string,
    isbn: row.isbn as string,
    pages: row.pages as number,
    year: row.year as number,
  };
}

export function getAll(): Book[] {
  const db = getDb();
  const stmt = db.prepare("SELECT * FROM books");
  const books: Book[] = [];
  while (stmt.step()) {
    books.push(rowToBook(stmt.getAsObject()));
  }
  stmt.free();
  return books;
}

export function getById(id: string): Book | undefined {
  const db = getDb();
  const stmt = db.prepare("SELECT * FROM books WHERE id = ?");
  stmt.bind([id]);
  if (stmt.step()) {
    const book = rowToBook(stmt.getAsObject());
    stmt.free();
    return book;
  }
  stmt.free();
  return undefined;
}

export function getByAuthorId(authorId: string): Book[] {
  const db = getDb();
  const stmt = db.prepare("SELECT * FROM books WHERE authorId = ?");
  stmt.bind([authorId]);
  const books: Book[] = [];
  while (stmt.step()) {
    books.push(rowToBook(stmt.getAsObject()));
  }
  stmt.free();
  return books;
}

export function create(data: CreateBook): Book {
  const db = getDb();
  const id = uuidv4();
  db.run(
    "INSERT INTO books (id, authorId, title, isbn, pages, year) VALUES (?, ?, ?, ?, ?, ?)",
    [id, data.authorId, data.title, data.isbn, data.pages, data.year],
  );
  saveDb();
  return { id, ...data };
}

export function update(id: string, data: UpdateBook): Book | undefined {
  const existing = getById(id);
  if (!existing) return undefined;

  const updated = { ...existing, ...data };
  const db = getDb();
  db.run(
    "UPDATE books SET authorId = ?, title = ?, isbn = ?, pages = ?, year = ? WHERE id = ?",
    [
      updated.authorId,
      updated.title,
      updated.isbn,
      updated.pages,
      updated.year,
      id,
    ],
  );
  saveDb();
  return updated;
}

export function remove(id: string): boolean {
  const db = getDb();
  db.run("DELETE FROM books WHERE id = ?", [id]);
  const changes = db.getRowsModified();
  if (changes > 0) saveDb();
  return changes > 0;
}
