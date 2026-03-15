import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import BookList from "../components/list/BookList.tsx";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <ErrorBoundary
      fallback={"Leider ist beim Lesen der Bücher ein Fehler aufgetreten"}
    >
      <Suspense fallback={"Bitte warten, Bücher werden geladen..."}>
        <BookList />
      </Suspense>
    </ErrorBoundary>
  );
}
