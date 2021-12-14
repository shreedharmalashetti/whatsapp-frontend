<template>
  <div class="">
    <v-header class="bg-green-500">
      <template #left>
        <fa-icon @click="$router.go(-1)" icon="arrow-left" class="icon" />
      </template>
      <template #center>
        <div class="flex justify-between space-x-20">
          <a @click="chatsType = 'personal'" class="icon">Personal</a>
          <a @click="chatsType = 'group'" class="icon">Group</a>
        </div>
      </template>
    </v-header>

    <div class="bg-black p-2">
      <div v-for="(chat, i) in currentChats" :key="i">
        <div
          @click="$router.push(`/chat/${chatsType}/${chat.id}`)"
          class="
            bg-blue-400
            rounded-full
            flex
            justify-between
            text-white
            my-2
            mx-2F
          "
        >
          <div class="bg-pink-500 rounded-full text-4xl w-10 h-10 text-center">
            {{ chat.name[0] }}
          </div>
          <div class="text-2xl text-center">{{ chat.name }}  </div>
          <div class="text-2xl px-2">Total: {{ chat.messages.length }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref, onMounted } from "vue";
import { chats } from "../store/chats.js";
import { client } from "../store/index.js";

const chatsType = ref("personal");

const currentChats = computed(() => {
  return chats.state.chats.filter((c) => c.type == chatsType.value);
});

onMounted(async () => {
  try {
    await client.connect();
    console.log("client connected");
  } catch (error) {
    console.log("connection error");
  }
});
</script>
