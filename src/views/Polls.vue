<template>
  <div>
    <v-header class="bg-green-500">
      <template #left>
        <fa-icon @click="$router.go(-1)" icon="arrow-left" class="icon" />
      </template>
      <template #center>
        <div>polls</div>
      </template>
    </v-header>
    <div class="text-center p-10">under maintainance</div>
  </div>
</template>
