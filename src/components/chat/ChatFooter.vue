<template>
  <div class="bg-gray-500 p-1 flex justify-between items-center space-x-2">
    <input
      ref="input"
      type="text"
      placeholder="type here..."
      v-model="message"
      class="rounded w-full h-8 border-none"
      @keypress.enter="sendMessage()"
    />
    <button class="btn btn-blue" @click="sendMessage()">send</button>
  </div>
</template>
<script setup>
import { ref } from "vue";
const emit = defineEmits(["send"]);
const message = ref("");
const input = ref();

const sendMessage = () => {
  if (!message.value) return;
  emit("send", message.value);
  message.value = "";
  input.value.focus();
};
</script>
