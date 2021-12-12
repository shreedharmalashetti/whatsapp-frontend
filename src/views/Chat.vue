<template>
  <div class="container mx-auto flex flex-col justify-between fixed inset-0">
    <chat-header name="raju"></chat-header>

    <div ref="body" class="bg-blue-300 overflow-y-auto h-full py-2">
      <Message
        v-for="(msg, i) in messages"
        :key="i"
        :message="msg.message"
        :name="msg.name"
        :isSelf="msg.isSelf"
      ></Message>
    </div>

    <chat-footer @send="sendMsg($event)"></chat-footer>
  </div>
</template>
<script setup>
import { ref, watchEffect } from "vue";
import ChatHeader from "../components/ChatHeader.vue";

import ChatFooter from "../components/ChatFooter.vue";
import Message from "../components/Message.vue";
import { sendMessage, receivedMessage } from "../store/index.js";

const body = ref();

const messages = ref([
  // {
  //   name: "",
  //   message: "",
  //   isSelf:false
  // },
]);

watchEffect(
  () => {
    const count = messages.value.length;
    body.value.scrollTop = body.value.scrollHeight;
  },
  {
    flush: "post",
  }
);

receivedMessage((msg) => {
  const message = {
    name: "server",
    message: msg,
    isSelf: false,
  };
  messages.value.push(message);
  // body.value.scrollTop = body.value.scrollHeight;
});

const sendMsg = (msg) => {
  const message = {
    name: "client",
    message: msg,
    isSelf: true,
  };
  sendMessage(msg);
  messages.value.push(message);
  // body.value.scrollTop = body.value.scrollHeight;
};
</script>
