import { z } from "zod";

export type Book = {
  id: string;
  authorId: string;
  title: string;
  isbn: string;
  pages: number;
  year: number;
};

export type CreateBook = Omit<Book, "id">;
export type UpdateBook = Partial<Book>;
