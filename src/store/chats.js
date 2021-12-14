import { reactive } from "vue";
// const backendUrl = "http://localhost:8000/";
const backendUrl = "https://socketiowhatsapp.herokuapp.com/";

class Chats {
  state = reactive({
    chats: [],
  });

  addChat(chat) {
    let chatIndex = this.state.chats.findIndex(
      (c) => c.id == chat.id && c.type == chat.type
    );
    if (chatIndex < 0) {
      chatIndex = chatIndex =
        this.state.chats.push({
          id: chat.id,
          name: chat.name,
          type: chat.type,
          messages: [],
        }) - 1;
    }

    return chatIndex;
  }

  addMessage(chat, message) {
    const chatIndex = this.addChat(chat);

    this.state.chats[chatIndex].messages.push(message);
  }
}

const chats = new Chats();
export { chats };
