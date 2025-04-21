import { useEffect, useRef } from "react";

export const useWebSocket = (
  shouldConnect: boolean,
  onMessage: (message: string) => void,
  wsUrl = "ws://localhost:5173/ws"
) => {
  const socketRef = useRef<WebSocket | null>(null);
  const prevShouldConnectRef = useRef(false);

  const closeConnection = () => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
  };

  const initConnection = () => {
    const socket = new WebSocket(wsUrl);

    socket.addEventListener("open", () => {
      console.log("🔑 WebSocket connection opened");
    });

    socket.addEventListener("message", (event) => {
      console.log("📩 Message:", event.data);
      onMessage(event.data);
    });

    socket.addEventListener("close", () => {
      console.log("🔒 WebSocket connection closed");
    });

    socketRef.current = socket;
  };

  useEffect(() => {
    const wasConnected = prevShouldConnectRef.current;
    const isConnected = shouldConnect;

    if (!wasConnected && isConnected) {
      initConnection();
    }

    if (wasConnected && !isConnected) {
      closeConnection();
    }

    prevShouldConnectRef.current = isConnected;

    return () => {
      closeConnection();
    };
  }, [shouldConnect]);

  return {
    isConnected: socketRef.current?.readyState === WebSocket.OPEN,
  };
};
