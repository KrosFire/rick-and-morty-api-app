<template>
  <div class="gender flex">
    <component :is="type" />
    <span class="uppercase"> {{ type }} </span>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GenderComponent",
  props: {
    type: {
      type: String,
      required: true,
    },
  },
});
</script>
