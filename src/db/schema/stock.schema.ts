import { serial, text, timestamp, pgTable } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { stockPriceTable } from "./stockPrice.schema";

export const stockTable = pgTable("stock", {
  id: serial("id").primaryKey(),
  symbol: text("symbol").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const stockRelations = relations(stockTable, ({ many }) => ({
  stockPrices: many(stockPriceTable)
}));

export type StockInsert = typeof stockTable.$inferInsert;
export type StockSelect = typeof stockTable.$inferSelect;
