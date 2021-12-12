<template>
  <div class="bg-black flex items-center">
    <div class="">
      <button class="btn btn-green" @click="$router.go(-1)">back</button>
    </div>
    <div class="w-full text-white text-3xl text-center p-2">
      {{ props.name }}
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  name: String,
});
</script>
