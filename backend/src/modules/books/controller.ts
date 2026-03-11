import { Request, Response } from "express";
import * as BookModel from "./model";

export function getById(req: Request<{ id: string }>, res: Response): void {
  const book = BookModel.getById(req.params.id);
  if (!book) {
    res.status(404).json({ error: "Book not found" });
    return;
  }
  res.json(book);
}
