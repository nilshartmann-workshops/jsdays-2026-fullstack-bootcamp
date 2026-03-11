import { DbBook, DbCreateBook } from "./books.types";
import { Database } from "sql.js";
import { v4 as uuidv4 } from "uuid";
import { saveDb } from "../../database/database";

function rowToBook(row: Record<string, any>): DbBook {
  return {
    id: row.id as string,
    authorId: row.authorId as string,
    title: row.title as string,
    isbn: row.isbn as string,
    pages: row.pages as number,
    year: row.year as number,
  };
}

export default class BooksDataSource {
  constructor(private readonly db: Database) {}

  getAll(): DbBook[] {
    const db = this.db;
    const stmt = db.prepare("SELECT * FROM books");
    const books: DbBook[] = [];
    while (stmt.step()) {
      books.push(rowToBook(stmt.getAsObject()));
    }
    stmt.free();
    return books;
  }

  getById(id: string): DbBook | null {
    const db = this.db;
    const stmt = db.prepare("SELECT * FROM books WHERE id = ?");
    stmt.bind([id]);
    if (stmt.step()) {
      const book = rowToBook(stmt.getAsObject());
      stmt.free();
      return book;
    }
    stmt.free();
    return null;
  }

  getByAuthorId(authorId: string): DbBook[] {
    const db = this.db;
    const stmt = db.prepare("SELECT * FROM books WHERE authorId = ?");
    stmt.bind([authorId]);
    const books: DbBook[] = [];
    while (stmt.step()) {
      books.push(rowToBook(stmt.getAsObject()));
    }
    stmt.free();
    return books;
  }

  create(data: DbCreateBook): DbBook {
    const db = this.db;
    const id = uuidv4();
    db.run(
      "INSERT INTO books (id, authorId, title, isbn, pages, year) VALUES (?, ?, ?, ?, ?, ?)",
      [id, data.authorId, data.title, data.isbn, data.pages, data.year],
    );
    saveDb();
    return { id, ...data };
  }
}
