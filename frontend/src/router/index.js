import { createWebHistory, createRouter } from "vue-router";
import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import Profil from "@/views/Profil.vue";

const routes = [
  {
    name: "Login",
    path: "/",
    component: Login,
  },
  {
    name: "Home",
    path: "/home",
    component: Home,
  },
  {
    name: "Profil",
    path: "/profil",
    component: Profil,
  },
  {
    path: "/:catchAll(.*)",
    component: Profil,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
