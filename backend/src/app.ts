import express from "express";
import cors from "cors";

import bookRoutes from "./modules/books/routes";
import authorRoutes from "./modules/authors/routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);

export default app;
