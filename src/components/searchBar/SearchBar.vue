<template>
  <div
    @click="setFocus"
    class="
      searchBar
      h-14
      pl-4
      pr-10
      relative
      border border-secondary
      rounded-xl
      flex
      justify-center
      items-center
    "
  >
    <input
      :placeholder="placeholder"
      @keypress.enter="emitSearch"
      ref="input"
      class="queryInput border-none focus:outline-none w-full"
      v-model="query"
    />
    <SearchIcon
      @click.stop="emitSearch"
      class="
        icon
        transition
        cursor-pointer
        absolute
        right-2
        top-0
        bottom-0
        m-auto
      "
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import SearchIcon from "@/components/icons/SearchIcon.vue";

export default defineComponent({
  name: "SearchBar",
  components: {
    SearchIcon,
  },
  emits: ["search"],
  setup(_, context) {
    const placeholder = ref<string>("Start typing to search...");
    const query = ref<string>("");
    const input = ref<HTMLInputElement>();

    const setFocus = (): void => {
      if (input.value !== undefined) {
        input.value.focus();
      }
    };

    const emitSearch = (): void => {
      context.emit("search", query.value);
    };

    return {
      placeholder,
      query,
      input,
      setFocus,
      emitSearch,
    };
  },
});
</script>

<style lang="scss" scoped>
.searchBar {
  .queryInput {
    font-family: var(--primary-font);
  }

  .icon:hover {
    transform: scale(1.15);
  }
}
</style>
