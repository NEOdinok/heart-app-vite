import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { SetupWorker } from "msw/browser";
import { setupMSW } from "@/mocks/browser";

async function enableMocking() {
  let mswWorker: SetupWorker | undefined;

  const startMswWorker = async () => {
    mswWorker = await setupMSW();
    await mswWorker?.start();
  };

  if (process.env.NODE_ENV === "development") {
    startMswWorker();
  }

  return () => {
    mswWorker?.stop();
  };
}

enableMocking();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
