<template>
  <div>Searching for {{ query }}</div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute, RouteLocationNormalizedLoaded } from "vue-router";

export default defineComponent({
  name: "SearchCharacter",
  setup() {
    const router = ref<RouteLocationNormalizedLoaded>(useRoute());
    const query = ref<string | string[]>(router.value.params.query);

    return {
      query,
    };
  },
});
</script>
<style lang=""></style>
