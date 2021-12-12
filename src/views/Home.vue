<template>
  <div>home page</div>
  <input type="text" v-model="message" />
  <button @click="sendMessage(message)">send message</button>
</template>

<script setup>
import { ref } from "vue";
import { sendMessage, receivedMessage } from "../store/index.js";

const message = ref("type here");

receivedMessage((msg) => {
  console.log('received from server',msg);
});


</script>
