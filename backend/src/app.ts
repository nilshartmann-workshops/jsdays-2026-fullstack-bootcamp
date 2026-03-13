import express from "express";
import cors from "cors";

import bookRoutes from "./modules/books/routes";
import authorRoutes from "./modules/authors/routes";
import { meRoute, validateSignature } from "./middleware/auth";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", validateSignature());

app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);
// Zum Testen eines Access Tokens
app.get("/api/me", meRoute);

export default app;
