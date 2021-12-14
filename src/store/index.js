import { io } from "socket.io-client";
import { chats } from "./chats.js";
import { user } from "./user.js";

class Client {
  // backendUrl = "http://localhost:8000/";
  backendUrl = "https://socketiowhatsapp.herokuapp.com/"
  socket = null;

  constructor() {}

  async connect() {
    if (this.socket && this.socket.connected) return;
    return new Promise((resolve, reject) => {
      console.log("connecting to socketio...");
      this.socket = io(this.backendUrl, {
        auth: {
          token: user.state.token,
        },
      });
      this.socket.on("connect", () => {
        console.log("socket io connected");
        resolve();
      });
      this.socket.on("connect_error", (err) => {
        console.error(err.message); // auth code is required
        reject();
      });
      this.socket.on("disconnect", () => {
        console.log("socket io disconnected");
      });
      this.socket.on("chats", (cs) => {
        for (let c of cs) chats.addChat(c);
      });
      this.socket.on("message", (chat, msg) => {
        chats.addMessage(chat, msg);
      });
    });
  }

  async joinChat(chatId) {
    return new Promise((resolve, reject) => {
      if (!this.socket.connected) return;
      this.socket.emit("join", chatId, (chat, err) => {
        if (err) return reject(err);
        chats.addChat(chat);
        resolve(chat);
      });
    });
  }
  async createChat(chatName) {
    return new Promise((resolve, reject) => {
      if (!this.socket.connected) return;

      this.socket.emit("create", chatName, (chat, err) => {
        if (err) return reject(err);

        chats.addChat(chat);
        resolve(chat);
      });
    });
  }

  sendMessage(toChat, msg) {
    if (!this.socket.connected) return;

    const message = {
      fromUser: {
        name: user.state.name,
        id: user.state.id,
      },
      messageId: 123,
      message: msg,
    };

    chats.addMessage(toChat, message);

    this.socket.emit("message", toChat, message);
  }
}

const client = new Client();

export { client };
