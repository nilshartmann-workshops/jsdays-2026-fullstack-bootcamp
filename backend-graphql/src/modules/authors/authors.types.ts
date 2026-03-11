import { z } from "zod";

const AuthorSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
});

const CreateAuthorSchema = AuthorSchema.omit({ id: true });
const UpdateAuthorSchema = CreateAuthorSchema.partial();

export type DbAuthor = z.infer<typeof AuthorSchema>;
export type DbCreateAuthor = z.infer<typeof CreateAuthorSchema>;
export type UpdateAuthor = z.infer<typeof UpdateAuthorSchema>;
