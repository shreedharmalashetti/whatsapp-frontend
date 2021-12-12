import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "virtual:windi.css";

import Loading from "./components/Loading.vue";

const app = createApp(App);

app.component("Loading", Loading);

app.use(router).mount("#app");
