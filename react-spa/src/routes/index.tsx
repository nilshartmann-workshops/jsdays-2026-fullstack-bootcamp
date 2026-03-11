import { createFileRoute } from "@tanstack/react-router";

import BookList from "../components/list/BookList.tsx";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <BookList />;
}
