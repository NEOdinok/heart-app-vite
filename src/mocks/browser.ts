import { handlers } from "./handlers";

export const setupMSW = async () => {
  if (typeof window !== "undefined") {
    const { setupWorker } = await import("msw/browser");

    const worker = await setupWorker(...handlers);

    return worker;
  }
};
