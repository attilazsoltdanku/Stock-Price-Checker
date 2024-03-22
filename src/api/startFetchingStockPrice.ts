import type { RequestHandler } from "express";
import { StockPriceSchema } from "../utils/zod";
import { fetchFinnhub } from "../utils/fetchFinnhub";
import { saveStock } from "../db/actions/stock";
import dayjs from "dayjs";

export const startFetchingStockPrice: RequestHandler = async (req, res) => {
  try {
    const symbol = req.params.symbol!;
    if (!symbol) {
      return res.status(400).send("Bad Request. Symbol is missing");
    }

    const result = await fetchFinnhub(`/quote?symbol=${symbol}`, { method: "GET" });
    const { c, t } = StockPriceSchema.parse(result);

    if (c === 0 && t === 0) {
      return res.status(404).send("Stock not found");
    }

    await saveStock({ symbol }, { currentPrice: c, lastUpdatedTime: dayjs.unix(t).toDate() });

    return res.json({ response: "Started to fetch stock price" });
  } catch (error) {
    console.error({ error });
    return res.status(500).send(`Internal Server ${error}`);
  }
};
