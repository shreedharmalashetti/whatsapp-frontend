<template>
  <div class="">
    <v-header class="bg-green-500">
      <template #left>
        <fa-icon @click="$router.go(-1)" icon="arrow-left" class="icon" />
      </template>
      <template #center>
        <div class="flex justify-between space-x-20">
          <button @click="chatsType = 'personal'" class="btn btn-pink">
            Personal
          </button>
          <button @click="chatsType = 'group'" class="btn btn-pink">
            Group
          </button>
        </div>
      </template>
    </v-header>

    <div class="mt-2 space-y-2">
      <div v-for="(chat, i) in currentChats" :key="i">
        <div
          v-if="chat.name"
          @click="$router.push(`/chat/${chatsType}/${chat.id}`)"
          class="
            bg-gray-400
            rounded-full
            flex
            justify-between
            items-center
            text-white
          "
        >
          <div
            class="bg-indigo-500 rounded-full text-4xl w-10 h-10 text-center"
          >
            {{ chat.name.toLocaleUpperCase()[0] }}
          </div>
          <div class="text-2xl text-center">{{ chat.name }}</div>
          <div class="text-xl px-2">msg count: {{ chat.messages.length }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref, onMounted } from "vue";
import { chats } from "../store/chats.js";
import { client } from "../store/client.js";

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
