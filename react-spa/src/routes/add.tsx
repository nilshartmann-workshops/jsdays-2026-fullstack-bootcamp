import { createFileRoute } from "@tanstack/react-router";

import AddBookForm from "../components/add/AddBookForm.tsx";

export const Route = createFileRoute("/add")({
  component: AddBookForm,
});
