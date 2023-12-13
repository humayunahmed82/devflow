import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimestamp = (created: Date): string => {
  const now = new Date();
  const diff = now - created;

  // Define time intervals in milliseconds
  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = day * 365;

  // Calculate the difference in various time units
  const yearsAgo = Math.floor(diff / year);
  const monthsAgo = Math.floor(diff / month);
  const daysAgo = Math.floor(diff / day);
  const hoursAgo = Math.floor(diff / hour);
  const minutesAgo = Math.floor(diff / minute);

  // Choose the appropriate format based on the difference
  if (yearsAgo > 0) {
    return `${yearsAgo} ${yearsAgo === 1 ? "year" : "years"} ago`;
  } else if (monthsAgo > 0) {
    return `${monthsAgo} ${monthsAgo === 1 ? "month" : "months"} ago`;
  } else if (daysAgo > 0) {
    return `${daysAgo} ${daysAgo === 1 ? "day" : "days"} ago`;
  } else if (hoursAgo > 0) {
    return `${hoursAgo} ${hoursAgo === 1 ? "hour" : "hours"} ago`;
  } else if (minutesAgo > 0) {
    return `${minutesAgo} ${minutesAgo === 1 ? "minute" : "minutes"} ago`;
  } else {
    return "Just now";
  }
};

export const formatNumberWithExtension = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(2) + "K";
  } else {
    return num.toString();
  }
};
