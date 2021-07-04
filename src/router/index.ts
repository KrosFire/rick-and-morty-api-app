import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AllCharacters from "@/views/AllCharacters/AllCharacters.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "AllCharacters",
    component: AllCharacters,
  },
  {
    path: "/FavoriteCharacters",
    name: "FavoriteCharacters",
    component: () =>
      import("@/views/FavoriteCharacters/FavoritesCharacters.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
