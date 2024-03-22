import { schedule } from "node-cron";
import { fetchFinnhub } from "../utils/fetchFinnhub";
import { StockPriceSchema } from "../utils/zod";
import { db } from "../db/client";
import { saveStockPrice } from "../db/actions/stockPrice";
import dayjs from "dayjs";

export const cronFetchStocks = () => {
  schedule("* * * * *", async () => {
    try {
      console.info("Fetching stocks...");
      //TODO: Use pagination
      const stocks = await db.query.stockTable.findMany({ columns: { id: true, symbol: true } });

      for (const stock of stocks) {
        const result = await fetchFinnhub(`/quote?symbol=${stock.symbol}`, { method: "GET" });
        const { c, t } = StockPriceSchema.parse(result);

        await saveStockPrice({ stockId: stock.id, currentPrice: c, lastUpdatedTime: dayjs.unix(t).toDate() });
      }
    } catch (error) {
      console.error("[cron] Failed to fetch stock prices. Error:", error);
    }
  });
};
