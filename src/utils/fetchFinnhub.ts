import dotenv from "dotenv";

dotenv.config();

export const fetchFinnhub = async (url: string, options: RequestInit) => {
  const { FINNHUB_API_KEY, FINNHUB_URL } = process.env;

  if (!FINNHUB_API_KEY || !FINNHUB_URL) throw new Error("Finnhub API key or URL not found");

  const response = await fetch(`${FINNHUB_URL}${url}&token=${FINNHUB_API_KEY}`, {
    ...options,
    cache: "no-store"
  });

  if (!response.ok) {
    const errorDetails = (await response.json()) as unknown;
    throw new Error(`HTTP error! Status: ${response.status}, URL: ${url}, Details: ${JSON.stringify(errorDetails)}}`);
  }

  return response.json();
};
