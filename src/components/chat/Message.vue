<template>
  <div
    :class="{
      'flex-row-reverse': props.alignRight,
    }"
    class="flex"
  >
    <div class="w-3/4 m-4 text-white flex items-end">
      <div
        v-if="props.type == 'group' && !props.alignRight"
        class="bg-pink-500 rounded-full text-4xl w-10 h-10 text-center"
      >
        {{ props.fromName[0] }}
      </div>
      <div class="bg-green-500 w-full text-xl p-2 break-all rounded-r-full">
        {{ props.message }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  message: String,
  fromName: String,
  myName: String,
  type: String, //group or personal
  alignRight: {
    type: Boolean,
    default: false,
  },
});
</script>
