import { ws } from "msw";

const heartRate = ws.link("ws://localhost:5173/ws");

const randomNumberString = () => {
  return String(Math.floor(Math.random() * (250 - 26 + 1)) + 26);
};

export const handlers = [
  heartRate.addEventListener("connection", ({ client }) => {
    console.log("Mock server: client connected");

    // Send initial random heart rate immediately
    client.send(randomNumberString());

    // Start sending random heart rates every 5 seconds
    const id = setInterval(() => {
      client.send(randomNumberString());
    }, 5000);

    // Listen to messages from client
    client.addEventListener("message", (event) => {
      console.log("Received from client:", event.data);
    });

    // Clear interval when client disconnects
    client.addEventListener("close", () => {
      console.log("Mock server: client disconnected");
      clearInterval(id);
    });
  }),
];
