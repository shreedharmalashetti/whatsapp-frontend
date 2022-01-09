<template>
  <div class="shadow-lg text-white  relative h-10 w-full">
    <div
      class="absolute left-0 top-1/2 transform -translate-l-1/2 -translate-y-1/2"
    >
      <div class="space-x-1 px-2 flex justify-between">
        <slot name="left"></slot>
      </div>
    </div>
    <div
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <div class="space-x-2 flex">
        <slot name="center"></slot>
      </div>
    </div>
    <div
      class="absolute top-1/2 right-0 transform -translate-r-1/2 -translate-y-1/2"
    >
      <div class="space-x-1 px-2 flex">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>
<script setup></script>
