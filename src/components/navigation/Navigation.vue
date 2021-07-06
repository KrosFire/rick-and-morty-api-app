<template>
  <nav class="nav py-6 px-4">
    <div
      class="
        container
        mx-auto
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
        class="mr-8 md:mr-20"
      >
        {{ navLink.name }}
      </NavigationElement>
    </div>
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
