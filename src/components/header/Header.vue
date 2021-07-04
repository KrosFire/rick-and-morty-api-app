<template>
  <header class="header w-full px-4 py-10 border-b border-lightGray">
    <div
      class="
        container
        mx-auto
        flex flex-col
        justify-center
        items-center
        md:flex-row md:justify-start
      "
    >
      <slot name="logo">
        <router-link to="/" class="block mb-3 md:mb-0 md:mr-4">
          <Logo />
        </router-link>
      </slot>
      <SearchBar @search="searchHandler" class="w-70 mt-3 md:mt-0 md:ml-4" />
    </div>
  </header>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Logo from "@/components/logo/Logo.vue";
import SearchBar from "@/components/searchBar/SearchBar.vue";

export default defineComponent({
  name: "Header",
  components: {
    Logo,
    SearchBar,
  },
  setup() {
    const searchHandler = (query: string): void => {
      console.log(query); // TODO
    };

    return {
      searchHandler,
    };
  },
});
</script>
