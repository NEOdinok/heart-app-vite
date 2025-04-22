import { minHeartRate, maxHeartRate } from "./globals";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// const clampHeartRate = (rate: number) =>
//   Math.min(Math.max(rate, minHeartRate), maxHeartRate);

export const getValidHeartRate = (rate: number) =>
  rate >= minHeartRate && rate <= maxHeartRate;
