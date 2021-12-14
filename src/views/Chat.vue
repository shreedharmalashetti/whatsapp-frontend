<template>
  <div class="flex flex-col justify-between h-full">
    <v-header class="bg-green-500">
      <template #left>
        <fa-icon @click="$router.go(-1)" icon="arrow-left" class="icon" />
      </template>
      <template #center>
        <div class="text-xl">{{ currentChat.name }} {{ currentChat.id }}</div>
      </template>
    </v-header>

    <div ref="body" class="bg-blue-300 overflow-y-auto h-full py-2">
      <message
        v-for="(msg, i) in currentChat.messages"
        :key="i"
        :type="currentChat.type"
        :alignRight="msg.fromUser.id == user.state.id"
        :message="msg.message"
        :fromName="msg.fromUser.name"
      ></message>
    </div>
    <chat-footer @send="sendMsg($event)"></chat-footer>
  </div>
</template>
<script setup>
import { computed, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

import { client } from "../store/index.js";
import { chats } from "../store/chats.js";
import { user } from "../store/user.js";

import ChatFooter from "../components/chat/ChatFooter.vue";
import Message from "../components/chat/Message.vue";

const route = useRoute();

const body = ref();

const currentChat = computed(() => {
  const type = route.params.chatType;
  const id = route.params.chatId;
  return chats.state.chats.find((c) => c.type == type && c.id == id);
});

watchEffect(
  () => {
    const count = currentChat.value.messages.length;
    body.value.scrollTop = body.value.scrollHeight;
  },
  {
    flush: "post",
  }
);

const sendMsg = async (msg) => {
  const toChat = {
    id: currentChat.value.id,
    name: currentChat.value.name,
    type: currentChat.value.type,
  };
  
  await client.sendMessage(toChat, msg);
  console.log("message sent");
};
</script>
