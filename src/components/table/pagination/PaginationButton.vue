<template>
  <button
    :active="active"
    :disabled="isDisabled"
    :class="isControlButton ? 'controlButton' : ''"
    @click.prevent="handleEmit"
    class="
      paginationButton
      text-secondary
      transition-all
      flex
      justify-center
      items-center
      text-center
      border border-secondary
      rounded-md
      w-10
      h-10
    "
  >
    <PrevIcon
      v-if="type === PaginationButtonType.PREVIOUS"
      class="fill-current"
    />
    <NextIcon
      v-else-if="type === PaginationButtonType.NEXT"
      class="fill-current"
    />
    <span v-else-if="type === PaginationButtonType.DOT">...</span>
    <span v-else> {{ pageNumber }} </span>
  </button>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { PaginationButtonType } from "@/components/table/pagination/pagination.types";
import NextIcon from "@/components/icons/PrevIcon.vue";
import PrevIcon from "@/components/icons/NextIcon.vue";

export default defineComponent({
  name: "PaginationButton",
  emits: ["click"],
  components: {
    NextIcon,
    PrevIcon,
  },
  props: {
    type: {
      type: String,
      default: PaginationButtonType.PAGE,
    },
    pageNumber: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const isDisabled = ref<boolean>(
      props.disabled || props.type === PaginationButtonType.DOT
    );
    const isControlButton = ref<boolean>(
      props.type === PaginationButtonType.PREVIOUS ||
        props.type === PaginationButtonType.NEXT
    );

    const handleEmit = (): void => {
      if (props.type !== PaginationButtonType.DOT) {
        context.emit("click", props.type, props.pageNumber);
      }
    };

    return {
      isDisabled,
      isControlButton,
      handleEmit,
      PaginationButtonType,
    };
  },
});
</script>
<style lang="scss" scoped>
.paginationButton {
  @apply cursor-default;

  &:not([disabled]) {
    @apply cursor-pointer;

    &:hover,
    &:active {
      @apply bg-primary text-white;
    }

    &.controlButton {
      @apply text-primary;

      &:hover {
        @apply text-white;
      }
    }
  }
}
</style>
