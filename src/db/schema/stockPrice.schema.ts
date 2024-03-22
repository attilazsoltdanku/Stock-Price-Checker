import { serial, timestamp, pgTable, decimal, bigint } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { stockTable } from "./stock.schema";

export const stockPriceTable = pgTable("stockPrice", {
  id: serial("id").primaryKey(),
  stockId: bigint("stock_id", { mode: "number" })
    .references(() => stockTable.id, {
      onDelete: "cascade"
    })
    .notNull(),
  currentPrice: decimal("current_price", { precision: 7, scale: 2 }).$type<number>().notNull(),
  lastUpdatedTime: timestamp("last_updated_time"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const stockPriceRelations = relations(stockPriceTable, ({ one }) => ({
  stock: one(stockTable, { fields: [stockPriceTable.stockId], references: [stockTable.id] })
}));

export type StockPriceInsert = typeof stockPriceTable.$inferInsert;
export type StockPriceSelect = typeof stockPriceTable.$inferSelect;
