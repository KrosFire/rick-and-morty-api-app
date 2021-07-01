<template>
  <nav
    class="
      nav
      container
      mx-auto
      py-6
      flex
      justify-center
      items-center
      md:justify-start
    "
  >
    <NavigationElement
      v-for="(navLink, index) of navigationLinks"
      :key="index"
      :to="navLink.to"
      class="mx-4"
    >
      {{ navLink.name }}
    </NavigationElement>
  </nav>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import NavigationElement from "@/components/navigation/NavigationElement.vue";
import { NavigationLink } from "@/components/navigation/Navigation.types";

export default defineComponent({
  name: "Navigation",
  components: {
    NavigationElement,
  },
  props: {
    navigationLinks: {
      type: Array as PropType<NavigationLink[]>,
      required: true,
    },
  },
});
</script>
