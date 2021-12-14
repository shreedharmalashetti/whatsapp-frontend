<template>
  <div
    class="
      fixed
      inset-0
      bg-gray-500 bg-opacity-75
      transition-opacity
      z-30
    "
  >
    <div class="bg-white h-full w-2/4  md:w-1/4">
      <slot></slot>
    </div>
  </div>
</template>
