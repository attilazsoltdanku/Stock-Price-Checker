import { z } from "zod";

export const StockPriceSchema = z.object({
  c: z.number(),
  d: z.number().nullable(),
  dp: z.number().nullable(),
  h: z.number(),
  l: z.number(),
  o: z.number(),
  pc: z.number(),
  t: z.number()
});
