<template>
  <div class="bg-black p-2 flex justify-between space-x-2">
    <input type="text" v-model="message" class="rounded w-full border-none" @keypress.enter="emit('send', message)" />
    <button class="btn btn-pink" @click="emit('send', message)">send</button>
  </div>
</template>
<script setup>
import { ref } from "vue";
const emit = defineEmits(["send"]);
const message = ref("type here...");
</script>
