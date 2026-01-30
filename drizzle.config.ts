import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { t3env } from "@/env";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/database/schema.ts",
  dialect: "sqlite",
  driver: "d1-http",
  dbCredentials: {
    accountId: t3env.CLOUDFLARE_ACCOUNT_ID,
    databaseId: t3env.CLOUDFLARE_DATABASE_ID,
    token: t3env.CLOUDFLARE_D1_TOKEN,
  },
});
