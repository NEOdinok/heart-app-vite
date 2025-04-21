import { ws } from "msw";

const heartRate = ws.link("ws://localhost:5173/ws");

const randomNumberString = () => {
  return String(Math.floor(Math.random() * (250 - 26 + 1)) + 26);
};

export const handlers = [
  heartRate.addEventListener("connection", ({ client }) => {
    client.send(randomNumberString());

    const id = setInterval(() => {
      client.send(randomNumberString());
    }, 5000);

    client.addEventListener("close", () => {
      clearInterval(id);
    });
  }),
];
