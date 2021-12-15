<template>
  <v-sidebar v-if="isSidebarOpen" @click.self="isSidebarOpen = false">
    <!-- if user logged in  -->
    <div v-if="user.state.token" class="space-y-4">
      <div class="bg-black text-white space-y-4 p-2">
        <div class="text-center">
          <fa-icon icon="user" class="text-5xl" />
        </div>

        <div class="text-white flex justify-center items-center">
          <div class="text-2xl text-indigo-500">{{ user.state.name }}</div>
        </div>
        <div class="text-white text-blue-500 flex justify-between items-center">
          <div class="text-xl">id:</div>
          <div>{{ user.state.id }}</div>
        </div>

        <div class="space-x-2 flex justify-between flex-wrap">
          <button
            @click="$router.replace('/updateuser'), (isSidebarOpen = false)"
            class="btn btn-pink"
          >
            update
          </button>
          <button @click="logout()" class="btn btn-red">logout</button>
        </div>
      </div>

      <div class="flex justify-between flex-wrap p-2">
        <button @click="joinChat()" class="btn btn-green">join</button>
        <button @click="createChat()" class="btn btn-green">create</button>
      </div>
    </div>

    <!-- user not logged in  -->
    <div v-if="!user.state.token" class="bg-black flex justify-between p-2">
      <router-link
        @click="isSidebarOpen = false"
        class="btn btn-blue"
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
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { user } from "./store/user.js";
import { chats } from "./store/chats.js";
import { client } from "./store/client.js";

const isSidebarOpen = ref(false);

const joinChat = async () => {
  try {
    const chatId = prompt("enter chat id");
    if (!chatId) return;
    const c = await client.joinChat(chatId);
  } catch (error) {
    console.log(error);
  }
};

const createChat = async () => {
  try {
    const chatName = prompt("enter chat name");
    if (!chatName) return;
    const c = await client.createChat(chatName);
  } catch (error) {
    console.log(error);
  }
};

const logout = async () => {
  await user.signOut();
  chats.state.chats = [];
};
</script>

<style></style>
