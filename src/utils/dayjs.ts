import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

const format = "YYYY-MM-DD HH:mm:ss";
const timezoneHungary = "Europe/Budapest";

export const getDateFromTimestamp = (timestamp: number, timezone = timezoneHungary) =>
  dayjs.unix(timestamp).tz(timezone).format(format);

export const getTimezoneDate = (date: Date, timezone = timezoneHungary) => dayjs(date).tz(timezone).format(format);
