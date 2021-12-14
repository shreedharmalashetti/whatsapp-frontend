<template>
  <v-modal v-if="isLoading" class="z-50">
    <div class="h-25 w-50 flex justify-center items-center">
      <h1>{{ typeof isLoading == "string" ? isLoading : "loading..." }}</h1>
    </div>
  </v-modal>
  
  <v-modal class="z-20" @click.self="$router.replace('/')">
    <form @submit.prevent="login()" class="w-xs shadow space-y-5 bg-indigo-300">
      <div class="px-2 text-2xl">
        <fa-icon @click="$router.replace('/')" icon="arrow-left" class="icon" />
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
        <div class="flex justify-between items-center">
          <label for="pass" class="text-lg">password</label>
          <fa-icon
            icon="eye"
            class="hover:text-blue-500"
            @click="togglePasswordType()"
          />
        </div>

        <input
          v-model="form.password"
          :type="passwordType"
          id="pass"
          placeholder="enter password"
          class="border rounded p-3 text-gray-700"
        />
      </div>
      <!-- handle error  -->
      <div class="text-center">
        <p class="text-red-900 text-sm">{{ postError }}</p>
      </div>
      <!-- submit  -->
      <div class="text-center p-4">
        <button type="submit" class="btn btn-pink">login</button>
      </div>
      <!-- got to signup  -->
      <div class="text-center p-4">
        <router-link
          :to="{ name: 'SignUp', params: { nextUrl: $route.params.nextUrl } }"
          replace
          class="text-blue-500"
          >go to signup</router-link
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
  email: null,
  password: null,
});
const postError = ref(null);
const isLoading = ref(false);
const passwordType = ref("password");

const togglePasswordType = () => {
  passwordType.value = passwordType.value == "password" ? "text" : "password";
};

const goBack = () => {
  if (route.params.nextUrl != null) {
    router.replace(route.params.nextUrl);
  } else {
    router.replace("/");
  }
};

async function login() {
  try {
    isLoading.value = "signin...";
    await user.signIn({ ...form });
    goBack();
    isLoading.value = false;
  } catch (err) {
    isLoading.value = false;
    postError.value = err;
  }
}
</script>
