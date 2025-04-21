import { useState } from "react";
import HeartAnimation from "@/components/HeartAnimation";
import HeartRateControls from "@/components/HeartRateControls";
import ServerToggle from "@/components/ServerToggle";

import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import { defaultHeartRate } from "@/lib/globals";
import { clampHeartRate } from "./lib/utils";
import { useWebSocket } from "./hooks/useWebSocket";

export default function Home() {
  const [heartRate, setHeartRate] = useState(defaultHeartRate);
  const [serverHeartRate, setServerHeartRate] = useState(false);

  const handleSocketMessage = (message: string) => {
    const serverValue = parseInt(message, 10);

    if (!isNaN(serverValue)) {
      setHeartRate(clampHeartRate(serverValue));
    }
  };

  useWebSocket(serverHeartRate, handleSocketMessage);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <AppHeader />

      <main className="flex flex-col items-center justify-center w-full">
        <div className="relative flex items-center justify-center">
          <HeartAnimation heartRate={heartRate} />
        </div>
      </main>

      <div className="w-full max-w-md">
        <div className="flex flex-col gap-6 p-6 rounded-lg border shadow-sm">
          <ServerToggle
            isEnabled={serverHeartRate}
            onToggle={() => setServerHeartRate(!serverHeartRate)}
          />
          <HeartRateControls
            heartRate={heartRate}
            onHeartRateChange={(newRate) => {
              setHeartRate(clampHeartRate(newRate));
            }}
            disabled={serverHeartRate}
          />
        </div>
      </div>

      <AppFooter />
    </div>
  );
}
