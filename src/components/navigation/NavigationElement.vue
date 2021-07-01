<template>
  <router-link
    :to="to"
    ref="routerLink"
    class="navElement block text-secondary"
  >
    <slot />
  </router-link>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavigationElement",
  props: {
    to: {
      type: String,
      default: "/",
    },
  },
});
</script>

<style lang="scss" scoped>
.navElement::after {
  @apply block w-0 h-1 bg-primary transition-all mx-auto;
  content: "";
}

.navElement.router-link-active,
.navElement:hover {
  @apply text-primary;

  &::after {
    @apply w-full;
  }
}
</style>
