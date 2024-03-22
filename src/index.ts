import type { Express } from "express";
import express from "express";
import dotenv from "dotenv";
import { getCurrentStockPrice } from "./api/getCurrentStockPrice";
import { cronFetchStocks } from "./cron";
import { startFetchingStockPrice } from "./api/startFetchingStockPrice";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/stock/:symbol", getCurrentStockPrice);
app.put("/stock/:symbol", startFetchingStockPrice);

cronFetchStocks();

app.listen(port, () => {
  console.info(`[server]: Server is running at http://localhost:${port}`);
});
