import type { RequestHandler } from "express";
import { fetchFinnhub } from "../utils/fetchFinnhub";
import { StockPriceSchema } from "../utils/zod";
import { getDateFromTimestamp, getTimezoneDate } from "../utils/dayjs";
import { calculateMovingAverage } from "../utils/calculateMovingAverage";
import { getStockWithTheLastStockPrices } from "../db/actions/stock";

export const getCurrentStockPrice: RequestHandler = async (req, res) => {
  try {
    const symbol = req.params.symbol!;
    if (!symbol) {
      return res.status(400).send("Bad Request. Symbol is missing");
    }

    const stock = await getStockWithTheLastStockPrices(symbol);

    if (!stock || !stock.stockPrices.length) {
      const result = await fetchFinnhub(`/quote?symbol=${symbol}`, { method: "GET" });
      const { c, t } = StockPriceSchema.parse(result);

      if (c === 0 && t === 0) {
        return res.status(404).send("Stock not found");
      }

      return res.json({
        currentPrice: c,
        lastUpdatedTime: getDateFromTimestamp(t),
        movingAverage:
          "We don't have enough data to calculate moving average. Please send a request for this endpoint to start fetching data. PUT http://localhost:3000/stock/:symbol For example: http://localhost:3000/stock/AAPL"
      });
    }

    const [lastStockPrice] = stock.stockPrices;

    return res.json({
      currentPrice: lastStockPrice ? lastStockPrice.currentPrice : "",
      lastUpdatedTime:
        lastStockPrice && lastStockPrice.lastUpdatedTime ? getTimezoneDate(lastStockPrice.lastUpdatedTime) : "",
      movingAverage: calculateMovingAverage(stock.stockPrices.map(sp => sp.currentPrice))
    });
  } catch (error) {
    console.error({ error });
    return res.status(500).send(`Internal Server ${error}`);
  }
};
