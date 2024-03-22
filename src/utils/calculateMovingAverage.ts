export const calculateMovingAverage = (prices: number[]) => {
  const newPriceList = prices.slice(0, 10);

  const sum = newPriceList.reduce((acc, price) => acc + price, 0);

  const movingAverage = sum / newPriceList.length;

  return movingAverage.toFixed(2);
};
