import { QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";
import { setupWorker } from "msw/browser";
import { afterEach, beforeAll, expect, test } from "vitest";
import { render } from "vitest-browser-react";

import { createQueryClient } from "../../create-query-client.tsx";
import AddBookForm from "./AddBookForm.tsx";

const worker = setupWorker(
  http.post("/api/books", async ({ request }) => {
    const payload = (await request.json()) as object;
    const newBook = { id: "book-1234", ...payload };
    return HttpResponse.json(newBook, { status: 201 });
  }),
);

beforeAll(async () => await worker.start());
afterEach(() => worker.resetHandlers());

test("adding book works", async () => {
  const screen = await render(
    <QueryClientProvider client={createQueryClient()}>
      <AddBookForm />
    </QueryClientProvider>,
  );

  const authorInput = screen.getByLabelText("Autor");
  const titleInput = screen.getByLabelText("Titel");
  const isbn = screen.getByLabelText("ISBN");
  const pagesInput = screen.getByLabelText("Seiten");
  const yearInput = screen.getByLabelText("Jahr");

  await expect.element(authorInput).toHaveValue("a-1");

  await titleInput.fill("Learning React");
  await isbn.fill("i-1-2-3-4");
  await pagesInput.fill("200");
  await yearInput.fill("2026");

  // Server ausschalten!!!!

  await screen.getByRole("button", { name: /speichern/i }).click();
  await expect
    .element(screen.getByText(/buch erfolgreich mit id book-1234 gespeichert/i))
    .toBeInTheDocument();
});

test("error when adding book failed", async () => {
  const screen = await render(
    <QueryClientProvider client={createQueryClient()}>
      <AddBookForm />
    </QueryClientProvider>,
  );

  const authorInput = screen.getByLabelText("Autor");
  const titleInput = screen.getByLabelText("Titel");
  const isbn = screen.getByLabelText("ISBN");
  const pagesInput = screen.getByLabelText("Seiten");
  const yearInput = screen.getByLabelText("Jahr");

  await expect.element(authorInput).toHaveValue("a-1");

  await titleInput.fill("Learning React");
  await isbn.fill("i-1-2-3-4");
  await pagesInput.fill("200");
  await yearInput.fill("2026");

  // Server ausschalten!!!!
  worker.use(
    http.post("/api/books", async ({ request }) => {
      return HttpResponse.error();
    }),
  );

  await screen.getByRole("button", { name: /speichern/i }).click();
  await expect
    .element(screen.getByText(/Fehler beim Speichern/i))
    .toBeInTheDocument();
});
