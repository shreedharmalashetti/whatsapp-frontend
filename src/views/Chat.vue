<template>
  <v-modal
    v-if="showChatInfo && currentChat"
    @click.self="showChatInfo = false"
    class="z-40"
  >
    <div class="bg-white space-y-4 p-4">
      <div>name: {{ currentChat.name }}</div>
      <div>id: {{ currentChat.id }}</div>
      <div>msgCount: {{ currentChat.messages.length }}</div>
      <div class="text-center">
        <button @click="leaveChat()" class="btn btn-red">leave chat</button>
      </div>
    </div>
  </v-modal>

  <div
    v-if="currentChat"
    class="flex flex-col justify-between inset-0 fixed container mx-auto max-w-2xl"
  >
    <v-header class="bg-gray-900">
      <template #left>
        <fa-icon @click="$router.go(-1)" icon="arrow-left" class="icon text-xl" />
      </template>
      <template #center>
        <div class="text text-center">{{ currentChat.name }}</div>
      </template>
      <template #right>
        <fa-icon @click="showChatInfo = true" icon="info-circle" class="icon text-xl" />
      </template>
    </v-header>

    <div ref="body" class="bg-gray-300 overflow-y-auto h-full py-2 space-y-2">
      <message
        v-for="(msg, i) in currentChat.messages"
        :key="i"
        :type="currentChat.type"
        :alignRight="msg.fromUser.id == user.state.id"
        :message="msg.message"
        :fromName="msg.fromUser.name"
        :fromId="msg.fromUser.id"
      ></message>
    </div>
    <chat-footer @send="sendMsg($event)"></chat-footer>
  </div>
</template>
<script setup>
import { computed, onMounted, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

import { client } from "../store/client.js";
import { chats } from "../store/chats.js";
import { user } from "../store/user.js";

import ChatFooter from "../components/chat/ChatFooter.vue";
import Message from "../components/chat/Message.vue";
import router from "../router/index.js";

const route = useRoute();

const body = ref();
const showChatInfo = ref(false);

const currentChat = computed(() => {
  const type = route.params.chatType;
  const id = route.params.chatId;
  return chats.state.chats.find((c) => c.type == type && c.id == id);
});

watchEffect(
  () => {
    if (!(currentChat.value && currentChat.value.messages.length)) return;
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

const leaveChat = async () => {
  await client.leaveChat(currentChat.value);
  router.go(-1);
};

onMounted(() => {
  client.connect();
});
</script>
