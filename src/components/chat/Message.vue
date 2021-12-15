<template>
  <v-modal v-if="showMessageInfo" @click.self="showMessageInfo = false">
    <div class="bg-white space-y-4 p-4">
      <div>member name: {{ props.fromName }}</div>
      <div>member id: {{ props.fromId }}</div>
    </div>
  </v-modal>

  <div
    :class="{
      'flex-row-reverse': props.alignRight,
    }"
    class="flex"
  >
    <div class="w-3/4 p-2 flex items-end text-white">
      <div
        @click="showMessageInfo == true"
        v-if="props.type == 'group' && !props.alignRight"
        class="bg-pink-500 rounded-full text-4xl w-10 h-10 text-center"
      >
        {{ props.fromName.toLocaleUpperCase()[0] }}
      </div>
      <div
        :class="{ 'rounded-l-full': props.alignRight }"
        class="bg-gray-500 w-full text-xl p-2 break-all rounded-r-full"
      >
        {{ props.message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  message: String,
  fromName: String,
  fromId: String,
  type: String, //group or personal
  alignRight: {
    type: Boolean,
    default: false,
  },
});

const showMessageInfo = ref(false);
</script>
