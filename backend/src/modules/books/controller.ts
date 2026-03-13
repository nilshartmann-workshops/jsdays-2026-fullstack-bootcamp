import { Request, Response } from "express";
import * as BookModel from "./model";
import * as AuthorModel from "../authors/model";
import { CreateBook } from "./validation-schema";

export function getAll(_req: Request, res: Response): void {
  const books = BookModel.getAll();
  res.json(books);
}

export function getById(req: Request<{ id: string }>, res: Response): void {
  const book = BookModel.getById(req.params.id);
  if (!book) {
    res.status(404).json({ error: "Book not found" });
    return;
  }
  res.json(book);
}

export function remove(req: Request<{ id: string }>, res: Response): void {
  const deleted = BookModel.remove(req.params.id);
  if (!deleted) {
    res.status(404).json({ error: "Book not found" });
    return;
  }
  res.status(204).send();
}

export function create(
  req: Request<unknown, unknown, CreateBook>,
  res: Response,
): void {
  const book = BookModel.create(req.body);
  res.status(201).json(book);
}
