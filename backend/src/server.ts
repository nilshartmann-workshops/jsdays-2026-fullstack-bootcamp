import "dotenv/config";
import app from "./app";
import { initDb } from "./database/init";

const PORT = 3000;

async function main(): Promise<void> {
  await initDb();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
