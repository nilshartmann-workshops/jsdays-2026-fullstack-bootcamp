import { z } from "zod";

const BookSchema = z.object({
  id: z.string(),
  authorId: z.string(),
  title: z.string().min(1, "Title is required"),
  isbn: z.string().min(1, "ISBN is required"),
  pages: z.int().positive("Pages must be a positive integer"),
  year: z.int(),
});

const CreateBookSchema = BookSchema.omit({ id: true });
const UpdateBookSchema = CreateBookSchema.partial();

export type DbBook = z.infer<typeof BookSchema>;
export type DbCreateBook = z.infer<typeof CreateBookSchema>;
export type DbUpdateBook = z.infer<typeof UpdateBookSchema>;
