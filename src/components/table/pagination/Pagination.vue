<template>
  <ul class="flex">
    <li>
      <PaginationButton
        :disabled="currentPage === 1"
        :type="PaginationButtonType.NEXT"
        @click="handleEmit(currentPage - 1)"
        class="prevPage"
      />
    </li>
    <li v-if="displayFirst">
      <PaginationButton
        :pageNumber="1"
        :type="PaginationButtonType.PAGE"
        @click="handleEmit(1)"
        class="firstPage"
      />
    </li>
    <li v-if="displayFirst">
      <PaginationButton :type="PaginationButtonType.DOT" class="dots" />
    </li>
    <li v-for="(page, index) of pagesToNavigate" :key="index">
      <PaginationButton
        :active="page === currentPage"
        :pageNumber="page"
        :type="PaginationButtonType.PAGE"
        @click="handleEmit(page)"
      />
    </li>
    <li v-if="displayLast">
      <PaginationButton :type="PaginationButtonType.DOT" class="dots" />
    </li>
    <li v-if="displayLast">
      <PaginationButton
        :pageNumber="amountOfPages"
        :type="PaginationButtonType.PAGE"
        @click="handleEmit(amountOfPages)"
        class="lastPage"
      />
    </li>
    <li>
      <PaginationButton
        :disabled="currentPage === amountOfPages"
        :type="PaginationButtonType.PREVIOUS"
        @click="handleEmit(currentPage + 1)"
        class="nextPage"
      />
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import PaginationButton from "@/components/table/pagination/PaginationButton.vue";
import { PaginationButtonType } from "@/components/table/pagination/pagination.types";
import { range } from "@/helpers";

export default defineComponent({
  name: "Pagination",
  components: {
    PaginationButton,
  },
  emits: ["click"],
  props: {
    amountOfPages: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    visiblePages: {
      type: Number,
      default: 6,
    },
  },
  setup(props, context) {
    const pagesToNavigate = ref<number[]>([]);
    const displayFirst = ref<boolean>(false);
    const displayLast = ref<boolean>(false);

    const handleEmit = (pageNumber: number): void => {
      if (pageNumber >= 1 && pageNumber <= props.amountOfPages) {
        context.emit("click", pageNumber);
      }
    };

    watchEffect(() => {
      displayFirst.value = false;
      displayLast.value = false;

      if (props.visiblePages === 0) {
        pagesToNavigate.value = [];
        return;
      } else if (props.amountOfPages <= props.visiblePages) {
        pagesToNavigate.value = range(1, props.amountOfPages);
        return;
      }

      let from = 1;
      let to = 1;

      const prevPages = Math.floor(props.visiblePages / 2);
      const nextPages = props.visiblePages - prevPages + 1;

      if (props.currentPage + 2 <= props.visiblePages) {
        displayLast.value = true;
        to = props.visiblePages - 1;
      } else if (
        props.currentPage + props.visiblePages - 3 >=
        props.amountOfPages
      ) {
        displayFirst.value = true;
        from = props.amountOfPages - props.visiblePages + 3 - 1;
        to = props.amountOfPages;
      } else {
        displayFirst.value = true;
        displayLast.value = true;
        from = props.currentPage - prevPages + 1;
        to = nextPages + props.currentPage - 3;
      }

      pagesToNavigate.value = range(from, to);
    });

    return {
      pagesToNavigate,
      displayFirst,
      displayLast,
      handleEmit,
      PaginationButtonType,
    };
  },
});
</script>
<style lang="scss" scoped>
ul {
  li {
    @apply mr-1 ml-1;

    &:first-child {
      @apply ml-0;
    }

    &:last-child {
      @apply mr-0;
    }
  }
}
</style>
