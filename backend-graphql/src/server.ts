import { initDb } from "./database/init";
import { createBookStoreApolloServer } from "./app";
import { createBookStoreGraphQLContext } from "./context";
import { startStandaloneServer } from "@apollo/server/standalone";
import { getDb } from "./database/database";

const PORT = 4000;

async function main(): Promise<void> {
  await initDb();

  const server = createBookStoreApolloServer();

  const { url } = await startStandaloneServer(server, {
    context: async ({ req, res }) => {
      // create context for each request to avoid caching problems
      // (otherwise one request would see data from another request)
      const db = getDb();
      return createBookStoreGraphQLContext(db);
    },
    listen: {
      port: PORT,
    },
  });

  console.log(`GraphQL Server is running on ${url}`);
}

main().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
