import { reactive } from "vue";

class Chats {
  backendUrl = "https://socketiowhatsapp.herokuapp.com/";
  state = reactive({
    chats: [
      {
        name: "shree",
        id:123,
        messagesCount: 100,
      },
      {
        name: "shree",
        id:123,
        messagesCount: 100,
      },
    ],
  });
  async getAllChats() {}
}

const chats = new Chats();
export { chats };
