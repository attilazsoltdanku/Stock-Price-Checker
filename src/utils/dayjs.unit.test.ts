import { expect, describe, it } from "vitest";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { getDateFromTimestamp, getTimezoneDate } from "./dayjs";
import { faker } from "@faker-js/faker";

dayjs.extend(utc);
dayjs.extend(timezone);

describe("getDateFromTimestamp function", () => {
  it("should return the correct date string from the timestamp in the specified timezone", () => {
    const timestamp = faker.number.int({
      min: faker.date.past().getTime(),
      max: faker.date.future().getTime()
    });
    const expectedDate = dayjs.unix(timestamp).tz("Europe/Budapest").format("YYYY-MM-DD HH:mm:ss");

    const result = getDateFromTimestamp(timestamp);

    expect(result).toBe(expectedDate);
  });
});

describe("getTimezoneDate function", () => {
  it("should return the correct date string from the Date object in the specified timezone", () => {
    const date = faker.date.past();
    const expectedDate = dayjs(date).tz("Europe/Budapest").format("YYYY-MM-DD HH:mm:ss");

    const result = getTimezoneDate(date);

    expect(result).toBe(expectedDate);
  });
});
