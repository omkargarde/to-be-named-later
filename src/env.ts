import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const t3env = createEnv({
  server: {
    CLOUDFLARE_ACCOUNT_ID: z.string().min(1),
    CLOUDFLARE_DATABASE_ID: z.string().min(1),
    CLOUDFLARE_D1_TOKEN: z.string().min(1),
    ecommerce_d1: z.any(),
  },
  clientPrefix: "PUBLIC_",
  client: {},

  runtimeEnv: {
    CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID,
    CLOUDFLARE_DATABASE_ID: process.env.CLOUDFLARE_DATABASE_ID,
    CLOUDFLARE_D1_TOKEN: process.env.CLOUDFLARE_D1_TOKEN,
    ecommerce_d1: process.env.ecommerce_d1,
  },
});
