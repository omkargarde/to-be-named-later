import { relations, sql } from "drizzle-orm";
import {
  check,
  int,
  integer,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
  id: integer("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
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

export const userRelations = relations(usersTable, ({ many }) => ({
  sessions: many(sessionTable),
}));

export const sessionTable = sqliteTable("session_table", {
  id: integer("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp_ms" }),
  userId: integer("user_id").references(() => usersTable.id, {
    onDelete: "cascade",
  }),
});

export const productsTable = sqliteTable("products_table", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  priceInPaisa: integer("price_in_paisa").notNull(),
  category: text("category"),
  isActive: integer("is_active", { mode: "boolean" }).default(sql`true`),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdateFn(() => sql`(current_timestamp)`),
});

export const ordersTable = sqliteTable("orders_table", {
  id: integer("id").primaryKey(),
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
  totalAmountInPaisa: integer("total_amount_in_paisa").notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdateFn(() => sql`(current_timestamp)`),
});

export const orderItemsTable = sqliteTable(
  "order_items_table",
  {
    id: integer("id").primaryKey(),
    orderId: integer("order_id")
      .references(() => ordersTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
    productId: integer("product_id")
      .references(() => productsTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
    quantity: int("quantity").notNull(),
    priceInPaisa: int("price_in_paisa").notNull(),
  },
  (table) => [
    check("quantity_greater_than_zero_check", sql`${table.quantity}>0`),
  ],
);
