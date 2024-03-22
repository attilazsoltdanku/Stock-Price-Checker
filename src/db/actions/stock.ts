import { desc, eq } from "drizzle-orm";
import { db } from "../client";
import type { StockPriceInsert } from "../schema";
import { stockPriceTable, stockTable, type StockInsert } from "../schema";

export const saveStock = async (stock: StockInsert, stockPrice: Omit<StockPriceInsert, "stockId">) => {
  try {
    await db.transaction(async tx => {
      const [savedStock] = await tx.insert(stockTable).values(stock).returning();
      await tx.insert(stockPriceTable).values({ ...stockPrice, stockId: savedStock.id });
    });
  } catch (error) {
    console.error("Error saving stock:", error);
  }
};

export const getStockWithTheLastStockPrices = async (symbol: string, limit = 10) =>
  await db.query.stockTable.findFirst({
    where: eq(stockTable.symbol, symbol),
    with: {
      stockPrices: {
        limit,
        orderBy: [desc(stockPriceTable.id)],
        columns: { currentPrice: true, lastUpdatedTime: true }
      }
    }
  });
