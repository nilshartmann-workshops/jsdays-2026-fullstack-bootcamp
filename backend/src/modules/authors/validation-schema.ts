import { z } from "zod";

export const AuthorSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
});

export const CreateAuthorSchema = AuthorSchema.omit({ id: true });
export const UpdateAuthorSchema = CreateAuthorSchema.partial();

export type Author = z.infer<typeof AuthorSchema>;
export type CreateAuthor = z.infer<typeof CreateAuthorSchema>;
export type UpdateAuthor = z.infer<typeof UpdateAuthorSchema>;
