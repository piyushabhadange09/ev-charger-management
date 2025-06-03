import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../components/LoginPage.vue";
import ChargerList from "../components/ChargerList.vue";
import MapView from "../components/MapView.vue";
import RegisterPage from "../components/RegisterPage.vue";

import EditCharger from "../components/EditCharger.vue";

const routes = [
  { path: "/", component: LoginPage },
  { path: "/register", component: RegisterPage },
  { path: "/chargers", component: ChargerList },
  { path: "/map", component: MapView },
  { path: "/edit/:id", component: EditCharger },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
