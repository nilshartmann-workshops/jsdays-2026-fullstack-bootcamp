import "./index.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { createRoot } from "react-dom/client";

import { createQueryClient } from "./create-query-client.tsx";
import { keycloak } from "./keycloak.ts";
// routeTree.gen wird vom Vite Plug-in beim Speichern
// generiert
import { routeTree } from "./routeTree.gen";

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}

function startReactApp() {
  // Global configuration for TanStack Query
  //  (Cache, Retry, etc.)
  const queryClient = createQueryClient();

  // Create a new router instance
  const router = createRouter({ routeTree, context: { queryClient } });

  createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}

keycloak.init({ onLoad: "login-required" }).then(() => {
  startReactApp();
});
