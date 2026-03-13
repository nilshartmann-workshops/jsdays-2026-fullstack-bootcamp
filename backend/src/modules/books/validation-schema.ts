import { z } from "zod";

export const BookSchema = z.object({
  id: z.string(),
  authorId: z.string(),
  title: z.string().min(1, "Title is required"),
  isbn: z.string().min(1, "ISBN is required"),
  pages: z.int().positive("Pages must be a positive integer"),
  year: z.int(),
});

export const CreateBookSchema = BookSchema.omit({ id: true });
export const UpdateBookSchema = CreateBookSchema.partial();

export type Book = z.infer<typeof BookSchema>;
export type CreateBook = z.infer<typeof CreateBookSchema>;
export type UpdateBook = z.infer<typeof UpdateBookSchema>;

//
// export type Book = {
//   id: string;
//   authorId: string;
//   title: string;
//   isbn: string;
//   pages: number;
//   year: number;
// };
//
// export type CreateBook = Omit<Book, "id">;
// export type UpdateBook = Partial<Book>;
