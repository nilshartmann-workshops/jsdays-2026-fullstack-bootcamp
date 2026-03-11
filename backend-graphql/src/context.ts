import AuthorsDataSource from "./modules/authors/authors.datasource";
import BooksDataSource from "./modules/books/books.datasource";
import { Database } from "sql.js";

export type BookStoreGraphQLContext = {
  dataSources: {
    authors: AuthorsDataSource;
    books: BooksDataSource;
  };
};

export async function createBookStoreGraphQLContext(
  db: Database,
): Promise<BookStoreGraphQLContext> {
  const authors = new AuthorsDataSource(db);
  const books = new BooksDataSource(db);

  return {
    dataSources: {
      authors,
      books,
    },
  };
}
