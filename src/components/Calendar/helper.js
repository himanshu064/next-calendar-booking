import { v4 as uuid } from "uuid";

export const getBrowserTimezone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

export function getBrowserTimezoneOffset() {
  const offsetInMinutes = new Date().getTimezoneOffset();
  const absoluteOffset = Math.abs(offsetInMinutes);

  const hours = Math.floor(absoluteOffset / 60);
  const minutes = absoluteOffset % 60;

  const sign = offsetInMinutes <= 0 ? "+" : "-";
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  return `${sign}${formattedHours}:${formattedMinutes}`;
}

export const createId = () => {
  return uuid();
};
