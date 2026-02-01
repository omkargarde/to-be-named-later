import { sql } from "drizzle-orm";
import { integer, numeric, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
  id: integer("id").notNull().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
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
  price: numeric("price").notNull(),
  category: text("category"),
  isActive: integer("is_active", { mode: "boolean" }).default(sql`true`),
  createAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdateFn(() => sql`(current_timestamp)`),
});

const ordersTable = sqliteTable("orders_table", {
  id: integer("id").notNull().primaryKey(),
  userId: integer("user_id")
    .references(() => usersTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  status: text("status", {
    enum: [
      "pending",
      "active",
      "draft",
      "out_of_stock",
      "archived",
      "rejected",
    ],
  })
    .notNull()
    .default("pending"),
  totalAmount: numeric("total_amount").notNull(),
  createAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdateFn(() => sql`(current_timestamp)`),
});
