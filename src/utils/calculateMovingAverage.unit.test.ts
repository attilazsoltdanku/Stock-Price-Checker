import { expect, describe, it } from "vitest";
import { faker } from "@faker-js/faker";
import { calculateMovingAverage } from "./calculateMovingAverage";

describe("calculateMovingAverage function", () => {
  it("should calculate the moving average of the last 10 prices correctly", () => {
    const prices = Array.from({ length: 10 }, () => faker.number.int({ min: 1, max: 100 }));

    const sum = prices.reduce((acc, price) => acc + price, 0);
    const expectedMovingAverage = (sum / 10).toFixed(2);

    const result = calculateMovingAverage(prices);

    expect(result).toBe(expectedMovingAverage);
  });
});
