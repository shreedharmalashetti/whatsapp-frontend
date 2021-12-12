import { io } from "socket.io-client";
const socket = io("http://localhost:8000");

socket.on("connect", () => {
  console.log("socket io connected");
});

const sendMessage = (msg) => {
  if (!socket.connected) return;
  socket.emit("message-from-client", msg);
};

const receivedMessage = (cb) => {
  socket.on("message-from-server", (msg) => {
    cb(msg);
  });
};

export { sendMessage, receivedMessage };
