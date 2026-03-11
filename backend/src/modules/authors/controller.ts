import { Request, Response } from "express";
import * as AuthorModel from "./model";
import * as BookModel from "../books/model";
import { CreateAuthor, UpdateAuthor } from "./validation-schema";

export function getAll(_req: Request, res: Response): void {
  const authors = AuthorModel.getAll();
  res.json(authors);
}

export function getById(req: Request<{ id: string }>, res: Response): void {
  const author = AuthorModel.getById(req.params.id);
  if (!author) {
    res.status(404).json({ error: "Author not found" });
    return;
  }
  const books = BookModel.getByAuthorId(author.id);
  res.json({ ...author, books });
}

export function create(
  req: Request<unknown, unknown, CreateAuthor>,
  res: Response,
): void {
  const author = AuthorModel.create(req.body);
  res.status(201).json(author);
}

export function update(
  req: Request<{ id: string }, unknown, UpdateAuthor>,
  res: Response,
): void {
  const updated = AuthorModel.update(req.params.id, req.body);
  if (!updated) {
    res.status(404).json({ error: "Author not found" });
    return;
  }
  res.json(updated);
}

export function remove(req: Request<{ id: string }>, res: Response): void {
  const deleted = AuthorModel.remove(req.params.id);
  if (!deleted) {
    res.status(404).json({ error: "Author not found" });
    return;
  }
  res.status(204).send();
}
