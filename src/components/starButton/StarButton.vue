<template>
  <button
    :active="activeButton"
    @click="handleClick"
    class="
      transition
      starButton
      flex
      justify-center
      items-center
      rounded-lg
      border-2 border-primary
      select-none
    "
  >
    <StarIcon class="transition text-primary fill-current" />
  </button>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import StarIcon from "@/components/icons/StarIcon.vue";

export default defineComponent({
  name: "starButton",
  emits: ["click"],
  components: {
    StarIcon,
  },
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const activeButton = ref<boolean>(props.active);

    const handleClick = () => {
      activeButton.value = !activeButton.value;
      context.emit("click");
    };

    return {
      activeButton,
      handleClick,
    };
  },
});
</script>
<style lang="scss" scoped>
.starButton {
  width: 43px;
  height: 43px;

  &[active="true"],
  &:hover {
    @apply bg-primary;

    .starIcon {
      @apply text-white;
    }
  }
}
</style>
