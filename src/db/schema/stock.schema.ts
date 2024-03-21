import { serial, text, timestamp, pgTable } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { stockPrice } from "./stockPrice.schema";

export const stock = pgTable("stock", {
  id: serial("id").primaryKey(),
  symbol: text("symbol"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at")
});

export const stockRelations = relations(stock, ({ many }) => ({
  stockPrices: many(stockPrice)
}));
