<template>
  <Header />
  <Navigation :navigationLinks="navLinks" />
  <router-view :key="route.fullPath" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute, RouteLocationNormalizedLoaded } from "vue-router";
import Header from "@/components/header/Header.vue";
import Navigation from "@/components/navigation/Navigation.vue";
import { NavigationLink } from "@/components/navigation/Navigation.types";

export default defineComponent({
  name: "App",
  components: {
    Header,
    Navigation,
  },
  setup() {
    const navLinks = ref<NavigationLink[]>([
      {
        to: "/",
        name: "All Characters",
      },
      {
        to: "/FavoriteCharacters",
        name: "Favorite",
      },
    ]);
    const route = ref<RouteLocationNormalizedLoaded>(useRoute());

    return {
      navLinks,
      route,
    };
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 100%;
}
</style>
