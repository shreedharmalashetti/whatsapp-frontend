import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Chat from "../views/Chat.vue";

const routes = [
  {
    name: "Home",
    path: "/",
    component: Home,
  },
  {
    name: "Chat",
    path: "/chat",
    component: Chat,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (!to.meta.requiresAuth) {
//     next();
//     return;
//   }

//   if (localStorage.getItem("jwt") == null) {
//     next({
//       name: "login",
//       params: { nextUrl: to.fullPath },
//     });
//     return;
//   } else {
//     next();
//   }
// });

export default router;
