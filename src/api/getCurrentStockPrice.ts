import type { RequestHandler } from "express";
import { fetchFinnhub } from "../utils/fetchFinnhub";
import { StockPriceSchema } from "../utils/zod";

export const getCurrentStockPrice: RequestHandler = async (req, res) => {
  try {
    const symbol = req.params.symbol!;
    if (!symbol) {
      return res.status(400).send("Bad Request. Symbol is missing");
    }

    const result = await fetchFinnhub("/quote?symbol=AAPL", { method: "GET" });
    const { c, t } = StockPriceSchema.parse(result);

    return res.json({
      currentPrice: c,
      timestamp: new Date(t * 1000)
    });
  } catch (error) {
    console.error({ error });
  }
};
