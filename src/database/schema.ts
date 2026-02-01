import { sql } from "drizzle-orm";
import { integer, numeric, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
  id: integer("id").notNull().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role", { enum: ["user", "admin"] }).notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdateFn(() => sql`(current_timestamp)`),
});

export const productsTable = sqliteTable("products_table", {
  id: integer("id").notNull().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: numeric("price", { mode: "number" }),
  category: text("category"),
  isActive: integer("is_active", { mode: "boolean" }),
  createAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdateFn(() => sql`(current_timestamp)`),
});
