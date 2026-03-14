import { Request, Response } from "express";
import * as BookModel from "./model";
import * as AuthorModel from "../authors/model";
import { BookSchema, CreateBook, CreateBookSchema } from "./validation-schema";
import { registry } from "../../openapi";
import z from "zod/v4";

// GET /books
registry.registerPath({
  method: "get",
  path: "/books",
  summary: "Get all books",
  responses: {
    200: {
      description: "List of books",
      content: { "application/json": { schema: z.array(BookSchema) } },
    },
  },
});
export function getAll(_req: Request, res: Response): void {
  const books = BookModel.getAll();
  res.json(books);
}

// GET /books/{id}
registry.registerPath({
  method: "get",
  path: "/books/{id}",
  summary: "Get a book by ID",
  request: {
    params: z.object({ id: z.string() }),
  },
  responses: {
    200: {
      description: "The found book",
      content: { "application/json": { schema: BookSchema } },
    },
  },
});
export function getById(req: Request<{ id: string }>, res: Response): void {
  const book = BookModel.getById(req.params.id);
  if (!book) {
    res.status(404).json({ error: "Book not found" });
    return;
  }
  res.json(book);
}

// DELETE /books/{id}
registry.registerPath({
  method: "delete",
  path: "/books/{id}",
  summary: "Delete a book",
  request: {
    params: z.object({ id: z.string() }),
  },
  responses: {
    204: { description: "Book deleted" },
    404: { description: "Book not found" },
  },
});
export function remove(req: Request<{ id: string }>, res: Response): void {
  const deleted = BookModel.remove(req.params.id);
  if (!deleted) {
    res.status(404).json({ error: "Book not found" });
    return;
  }
  res.status(204).send();
}

// POST /books
registry.registerPath({
  method: "post",
  path: "/books",
  summary: "Create a new book",
  request: {
    body: {
      content: { "application/json": { schema: CreateBookSchema } },
    },
  },
  responses: {
    201: {
      description: "Created book",
      content: { "application/json": { schema: BookSchema } },
    },
  },
});
export function create(
  req: Request<unknown, unknown, CreateBook>,
  res: Response,
): void {
  const book = BookModel.create(req.body);
  res.status(201).json(book);
}
