import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "virtual:windi.css";

import Modal from "./components/Modal.vue";
import Sidebar from "./components/Sidebar.vue";
import Header from "./components/Header.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowLeft, faBars, faInfoCircle, faUser } from "@fortawesome/free-solid-svg-icons";

library.add(faArrowLeft, faBars,faInfoCircle, faUser);

const app = createApp(App);
app.component("fa-icon", FontAwesomeIcon);

app.component("vModal", Modal);
app.component("vHeader", Header);
app.component("vSidebar", Sidebar);

app.use(router).mount("#app");
