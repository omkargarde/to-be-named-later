import { sql } from "drizzle-orm";
import {
  check,
  int,
  integer,
  numeric,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

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
  priceInPaisa: numeric("price_in_paisa").notNull(),
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
  totalAmountInPaisa: numeric("total_amount_in_paisa").notNull(),
  createAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdateFn(() => sql`(current_timestamp)`),
});

const orderItemsTable = sqliteTable(
  "order_items_table",
  {
    id: integer("id").notNull().primaryKey(),
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
  (table) => ({
    quantityCheck: check(
      "quantity_greater_than_zero_check",
      sql`${table.quantity}>0`,
    ),
  }),
);
