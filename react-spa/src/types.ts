import { z } from "zod/v4";

export const BookSchema = z.object({
  id: z.string(),
  authorId: z.string(),
  title: z.string().min(1, "Title is required"),
  isbn: z.string().min(1, "ISBN is required"),
  pages: z.int().positive("Pages must be a positive integer"),
  year: z.int(),
});

export const CreateBookSchema = BookSchema.omit({ id: true });
export const BookListSchema = BookSchema.array();
export const UpdateBookSchema = CreateBookSchema.partial();

export type Book = z.infer<typeof BookSchema>;
export type BookList = z.infer<typeof BookListSchema>;
export type CreateBook = z.infer<typeof CreateBookSchema>;
export type UpdateBook = z.infer<typeof UpdateBookSchema>;
