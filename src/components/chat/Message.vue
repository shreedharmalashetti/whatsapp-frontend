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
    <div
      class="w-3/4 p-1 flex items-center bg-gray-700 rounded-full text-white"
    >
      <a
        @click="showMessageInfo=true"
        v-if="props.type == 'group' && !props.alignRight"
        class="bg-indigo-600 rounded-full text-4xl w-10 h-10 text-center cursor-pointer"
      >
        {{ props.fromName.toLocaleUpperCase()[0] }}
      </a>
      <div class="text-md p-2 break-all">
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
