import { serial, timestamp, pgTable, decimal, bigint } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { stock } from "./stock.schema";

export const stockPrice = pgTable("stockPrice", {
  id: serial("id").primaryKey(),
  stockId: bigint("stock_id", { mode: "number" })
    .references(() => stock.id, {
      onDelete: "cascade"
    })
    .notNull(),
  currentPrice: decimal("current_price"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at")
});

export const stockPriceRelations = relations(stockPrice, ({ one }) => ({
  stock: one(stock, { fields: [stockPrice.stockId], references: [stock.id] })
}));
