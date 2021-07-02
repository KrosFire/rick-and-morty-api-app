<template>
  <ul class="flex">
    <li>
      <PaginationButton
        :type="PaginationButtonType.NEXT"
        class="prevPage"
        ref=""
      />
    </li>
    <li v-if="displayFirst">
      <PaginationButton
        :pageNumber="1"
        :type="PaginationButtonType.PAGE"
        class="firstPage"
      />
    </li>
    <li v-if="displayDotLeft">
      <PaginationButton :type="PaginationButtonType.DOT" class="dots" />
    </li>
    <li v-for="(page, index) of pagesToNavigate" :key="index">
      <PaginationButton :pageNumber="page" :type="PaginationButtonType.PAGE" />
    </li>
    <li v-if="displayDotRight">
      <PaginationButton :type="PaginationButtonType.DOT" class="dots" />
    </li>
    <li v-if="displayLast">
      <PaginationButton
        :pageNumber="amountOfPages"
        :type="PaginationButtonType.PAGE"
        class="lastPage"
      />
    </li>
    <li>
      <PaginationButton
        :type="PaginationButtonType.PREVIOUS"
        class="prevPage"
      />
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import PaginationButton from "@/components/table/pagination/PaginationButton.vue";
import { PaginationButtonType } from "@/components/table/pagination/pagination.types";

export default defineComponent({
  name: "Pagination",
  components: {
    PaginationButton,
  },
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
      default: 5,
    },
  },
  setup(props) {
    const pagesToNavigate = ref<number[]>([]);
    const displayFirst = ref<boolean>(false);
    const displayLast = ref<boolean>(false);
    const displayDotLeft = ref<boolean>(false);
    const displayDotRight = ref<boolean>(false);

    const range = (from: number, to: number): number[] => {
      const range = [];

      for (let i = from; i <= to; i++) {
        range.push(i);
      }

      return range;
    };

    watchEffect(() => {
      displayFirst.value = false;
      displayLast.value = false;
      displayDotLeft.value = false;
      displayDotRight.value = false;

      if (props.visiblePages === 0) {
        pagesToNavigate.value = [];
        return;
      } else if (props.amountOfPages <= props.visiblePages) {
        pagesToNavigate.value = range(1, props.amountOfPages);
        return;
      }

      const even = props.visiblePages % 2 === 0 ? 1 : 0;
      const prevPages = Math.floor(props.visiblePages / 2);
      const nextPages = props.visiblePages - prevPages + 1 + even;

      let from = 0;
      let to = 0;

      if (props.currentPage > prevPages && props.currentPage < nextPages) {
        displayFirst.value = true;
        displayLast.value = true;
        displayDotLeft.value = true;
        displayDotRight.value = true;

        from = props.currentPage - prevPages + 2;
        to = props.currentPage + prevPages - 2 - even;
      } else if (props.currentPage === prevPages) {
        displayLast.value = true;
        displayDotRight.value = true;

        from = 1;
        to = props.currentPage + prevPages - 1 - even;
      } else if (props.currentPage === nextPages) {
        displayFirst.value = true;
        displayDotLeft.value = true;

        from = props.currentPage - prevPages + 1;
        to = props.amountOfPages;
      } else {
        displayLast.value = true;
        displayDotRight.value = true;

        from = 1;
        to = nextPages;
      }

      pagesToNavigate.value = range(from, to);
    });

    return {
      pagesToNavigate,
      displayFirst,
      displayLast,
      displayDotLeft,
      displayDotRight,
      PaginationButtonType,
    };
  },
});
</script>
<style lang="scss" scoped>
ul {
  li {
    @apply mr-2 ml-2;

    &:first-child {
      @apply ml-0;
    }

    &:last-child {
      @apply mr-0;
    }
  }
}
</style>
