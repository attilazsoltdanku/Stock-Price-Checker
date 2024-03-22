import { db } from "../client";
import type { StockPriceInsert } from "../schema";
import { stockPriceTable } from "../schema";

export const saveStockPrice = async (data: StockPriceInsert) => {
  try {
    await db.insert(stockPriceTable).values(data).returning();
  } catch (error) {
    console.error("Error saving stock price:", error);
  }
};
