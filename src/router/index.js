import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Chat from "../views/Chat.vue";
import Chats from "../views/Chats.vue";
import Polls from "../views/Polls.vue";

import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import UpdateUser from "../views/UpdateUser.vue";

import { user } from "../store/user.js";

const routes = [
  {
    name: "Home",
    path: "/",
    component: Home,
  },
  {
    name: "SignIn",
    path: "/signin",
    component: SignIn,
  },
  {
    name: "SignUp",
    path: "/signup",
    component: SignUp,
  },
  {
    name: "UpdateUser",
    path: "/updateuser",
    component: UpdateUser,
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: "Chats",
    path: "/chats",
    component: Chats,
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: "Chat",
    path: "/chat/:chatType/:chatId",
    component: Chat,
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: "Polls",
    path: "/polls",
    component: Polls,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.requiresAuth && !user.state.token) {
    next({
      name: "SignIn",
      params: { nextUrl: to.fullPath },
    });
    return;
  }

  next();
});

export default router;
