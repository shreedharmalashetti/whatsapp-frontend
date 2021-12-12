<template>
  <div
    class="bg-blue-400 rounded-full flex justify-between text-white my-2 mx-2F"
  >
    <div class="bg-pink-500 rounded-full text-4xl w-10 h-10 text-center">
      {{ props.name[0] }}
    </div>
    <div class="text-2xl text-center">
      {{ props.name }}
    </div>
    <div class="text-2xl px-2">Total: {{ props.messagesCount }}</div>
  </div>
</template>
<script setup>
const props = defineProps({
  name: String,
  messagesCount: Number,
});
</script>
