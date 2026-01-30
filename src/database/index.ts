import { drizzle } from "drizzle-orm/d1";

export default {
  async fetch(request: Request, env: Env) {
    const db = drizzle(env.ecommerce_d1);
  },
};
