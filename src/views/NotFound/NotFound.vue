<template>
  <div class="notFound container mx-auto justify-center items-center">
    <h1>{{ msg }}</h1>
    <router-link to="/" class="flex justify-center my-4 mx-auto w-56">
      <Logo />
    </router-link>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import Logo from "@/components/logo/Logo.vue";

export default defineComponent({
  components: {
    Logo,
  },
  setup() {
    const msg = ref<string>("404 - Page not found");

    return {
      msg,
    };
  },
});
</script>
<style lang=""></style>
