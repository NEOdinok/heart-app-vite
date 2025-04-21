import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { minHeartRate, maxHeartRate } from "./globals";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const clampHeartRate = (rate: number) =>
  Math.min(Math.max(rate, minHeartRate), maxHeartRate);
