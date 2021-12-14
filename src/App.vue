<template>
  <v-sidebar v-if="isSidebarOpen" @click.self="isSidebarOpen = false">
    <div class="bg-black text-white text-5xl h-1/4 text-center">
      <fa-icon icon="user" class="m-4" />
    </div>
    <div class="max-w-md mx-auto">
      <div v-if="user.state.token" class="text-center space-y-4 m-2">
        <div class="text-green-500 text-3xl">{{ user.state.name }}</div>

        <div class="space-x-2 flex justify-center flex-wrap">
          <button
            @click="$router.replace('/updateuser'), (isSidebarOpen = false)"
            class="btn btn-green"
          >
            update
          </button>
          <button @click="logout()" class="btn btn-red">logout</button>
        </div>
        <div class="space-x-2 flex justify-center flex-wrap">
          <button @click="joinChat()" class="btn btn-green">joinChat</button>
          <button @click="createChat()" class="btn btn-green">
            createChat
          </button>
        </div>
      </div>

      <div v-if="!user.state.token" class="flex justify-around">
        <router-link
          @click="isSidebarOpen = false"
          class="btn btn-pink"
          to="/signin"
          >signin</router-link
        >
        <router-link
          @click="isSidebarOpen = false"
          class="btn btn-pink"
          to="/signup"
          >signup</router-link
        >
      </div>
    </div>
  </v-sidebar>

  <div
    class="
      container
      mx-auto
      max-w-2xl
      fixed
      inset-0
      flex flex-col
      justify-between
    "
  >
    <v-header class="bg-indigo-500">
      <template #left>
        <fa-icon @click="isSidebarOpen = true" icon="bars" class="icon" />
      </template>
      <template #center>Chat App </template>
    </v-header>
    <div class="h-full">
      <router-view ></router-view>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { user } from "./store/user.js";
import { client } from "./store/index.js";

const isSidebarOpen = ref(false);

const joinChat = async () => {
  try {
    const chatId = prompt("enter chat id");
    if (!chatId) return;
    const c = await client.joinChat(chatId);
    console.log(c);
  } catch (error) {
    console.log(error);
  }
};

const createChat = async () => {
  try {
    const chatName = prompt("enter chat name");
    if (!chatName) return;
    const c = await client.createChat(chatName);
    console.log(c);
  } catch (error) {
    console.log(error);
  }
};

const logout = async () => {
  await user.signOut();
};
</script>

<style></style>
