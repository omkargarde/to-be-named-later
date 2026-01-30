import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const t3env = createEnv({
  server: {
    CLOUDFLARE_ACCOUNT_ID: z.string().min(1),
    CLOUDFLARE_DATABASE_ID: z.string().min(1),
    CLOUDFLARE_D1_TOKEN: z.string().min(1),
  },
  clientPrefix: "PUBLIC_",
  client: {},
  runtimeEnv: process.env,
});
