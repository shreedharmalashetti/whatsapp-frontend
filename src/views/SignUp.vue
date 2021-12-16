<template>
  <v-modal v-if="isLoading" class="z-50">
    <div class="h-25 w-50 flex justify-center items-center">
      <h1>{{ typeof isLoading == "string" ? isLoading : "loading..." }}</h1>
    </div>
  </v-modal>

  <v-modal class="z-30" @click.self="$router.replace('/')">
    <form
      @submit.prevent="signup()"
      class="w-xs shadow space-y-2 bg-indigo-300 rounded"
    >
      <div class="px-2 text-2xl">
        <fa-icon @click="$router.replace('/')" icon="arrow-left" class="icon" />
      </div>
      <!-- name  -->
      <div class="flex flex-col mx-3">
        <label for="name" class="text-lg">Name</label>
        <input
          v-model="form.name"
          type="text"
          id="name"
          placeholder="user name"
          class="border rounded p-3 text-gray-700"
        />
      </div>
      <!-- email  -->
      <div class="flex flex-col mx-3">
        <label for="email" class="text-lg">email</label>
        <input
          v-model="form.email"
          type="email"
          id="email"
          placeholder="enter email"
          class="border rounded p-3 text-gray-700"
        />
      </div>
      <!-- password  -->
      <div class="flex flex-col mx-3">
        <label for="pass" class="text-lg">password</label>
        <input
          v-model="form.password"
          type="text"
          id="pass"
          placeholder="password"
          class="border rounded p-3 text-gray-700"
        />
      </div>
      <!-- submit  -->
      <div class="text-center p-4">
        <button type="submit" class="btn btn-pink">Register</button>
      </div>
      <!-- handle error  -->
      <div class="text-center">
        <p class="text-red-500 text-sm">{{ postError }}</p>
      </div>
      <!-- go to signin  -->
      <div class="text-center p-4">
        <router-link
          :to="{ name: 'SignIn', params: { nextUrl: $route.params.nextUrl } }"
          replace
          class="text-blue-500"
          >go to signin</router-link
        >
      </div>
    </form>
  </v-modal>
</template>
<script setup>
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { user } from "../store/user.js";

const router = useRouter();
const route = useRoute();

const form = reactive({
  name: "",
  email: "",
  password: "",
});
const postError = ref(null);
const isLoading = ref(false);

const goBack = () => {
  if (route.params.nextUrl != null) {
    router.replace(route.params.nextUrl);
  } else {
    router.replace("/");
  }
};

async function signup() {
  try {
    isLoading.value = "signup....";
    await user.signUp({ ...form });

    goBack();

    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
    postError.value = error;
  }
}
</script>
