import { t3env } from "@/env";
import { drizzle } from "drizzle-orm/d1";

export default {
  async fetch(_request: Request, env: Env) {
    const db = drizzle(env.ecommerce_d1);
  },
};
export const orm = drizzle(t3env.ecommerce_d1);
