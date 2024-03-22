import { desc, eq } from "drizzle-orm";
import { db } from "../client";
import { stockPriceTable, stockTable, type StockInsert } from "../schema";

export const saveStock = async (data: StockInsert) => {
  try {
    return await db.insert(stockTable).values(data).returning();
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
