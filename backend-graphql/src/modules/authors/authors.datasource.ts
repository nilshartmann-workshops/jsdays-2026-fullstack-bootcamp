import { DbAuthor, DbCreateAuthor } from "./authors.types";
import { Database } from "sql.js";
import { v4 as uuidv4 } from "uuid";
import { saveDb } from "../../database/database";
function rowToAuthor(row: Record<string, any>): DbAuthor {
  return {
    id: row.id as string,
    firstName: row.firstName as string,
    lastName: row.lastName as string,
  };
}

export default class AuthorsDataSource {
  constructor(private readonly db: Database) {}

  getAll(): DbAuthor[] {
    const db = this.db;
    const stmt = db.prepare("SELECT * FROM authors");
    const authors: DbAuthor[] = [];
    while (stmt.step()) {
      authors.push(rowToAuthor(stmt.getAsObject()));
    }
    stmt.free();
    return authors;
  }

  getById(id: string): DbAuthor | null {
    const db = this.db;
    const stmt = db.prepare("SELECT * FROM authors WHERE id = ?");
    stmt.bind([id]);
    if (stmt.step()) {
      const author = rowToAuthor(stmt.getAsObject());
      stmt.free();
      return author;
    }
    stmt.free();
    return null;
  }

  create(data: DbCreateAuthor): DbAuthor {
    const db = this.db;
    const id = uuidv4();
    db.run("INSERT INTO authors (id, firstName, lastName) VALUES (?, ?, ?)", [
      id,
      data.firstName,
      data.lastName,
    ]);
    saveDb();
    return { id, ...data };
  }
}
