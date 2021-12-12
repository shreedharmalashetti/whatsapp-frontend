<template>
  <div class="container mx-auto flex flex-col justify-between fixed inset-0">
    <div class="bg-green-500 text-white text-2xl text-center">Chats</div>

    <div class="bg-black h-full overflow-auto">
      <Chat
        v-for="(chat, i) in chats.state.chats"
        :name="chat.name"
        :messagesCount="chat.messagesCount"
        @click="$router.push('/chat')"
      ></Chat>
    </div>
  </div>
</template>
<script setup>
import { chats } from "../store/chats";
import Chat from "../components/Chat.vue";
</script>
