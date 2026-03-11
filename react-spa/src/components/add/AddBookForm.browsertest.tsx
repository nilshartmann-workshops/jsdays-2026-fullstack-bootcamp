import { QueryClientProvider } from "@tanstack/react-query";
import { test } from "vitest";
import { render } from "vitest-browser-react";

import { createQueryClient } from "../../create-query-client.tsx";
import AddBookForm from "./AddBookForm.tsx";

test("adding book works", async () => {
  const screen = await render(
    <QueryClientProvider client={createQueryClient()}>
      <AddBookForm />
    </QueryClientProvider>,
  );

  // ...
});
