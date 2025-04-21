import { useState, useEffect, useRef } from "react";
import HeartAnimation from "@/components/HeartAnimation";
import HeartRateControls from "@/components/HeartRateControls";
import ServerToggle from "@/components/ServerToggle";

import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import { defaultHeartRate } from "@/lib/globals";

export default function Home() {
  const [heartRate, setHeartRate] = useState(defaultHeartRate);
  const [serverHeartRate, setServerHeartRate] = useState(false);

  const prevServerHeartRateRef = useRef(false);
  const socketRef = useRef<WebSocket | null>(null);

  const closeSocketMockConnection = () => {
    if (socketRef.current) {
      console.log("Closing WebSocket...");
      socketRef.current.close();
      socketRef.current = null;
    }
  };

  const initSocket = () => {
    console.log("Init socket");

    const socket = new WebSocket("ws://localhost:5173/ws");

    socket.addEventListener("open", () => {
      console.log("🔑 WebSocket connection opened");
    });

    socket.addEventListener("message", (event) => {
      console.log("📩 Message:", event.data);

      const serverValue = parseInt(event.data, 10);

      if (!isNaN(serverValue)) {
        setHeartRate(serverValue);
      }
    });

    socket.addEventListener("close", () => {
      console.log("🔒 WebSocket connection closed");
    });

    socketRef.current = socket;
  };

  useEffect(() => {
    const wasServerHeartRate = prevServerHeartRateRef.current;
    const isServerHeartRate = serverHeartRate;

    if (!wasServerHeartRate && isServerHeartRate) {
      initSocket();
    }

    if (wasServerHeartRate && !isServerHeartRate) {
      closeSocketMockConnection();
    }

    prevServerHeartRateRef.current = isServerHeartRate;

    return () => {
      closeSocketMockConnection();
    };
  }, [serverHeartRate]);

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
            setHeartRate={setHeartRate}
            disabled={serverHeartRate}
          />
        </div>
      </div>

      <AppFooter />
    </div>
  );
}
