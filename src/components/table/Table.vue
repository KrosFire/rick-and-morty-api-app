<template>
  <table class="flex flex-col max-w-full overflow-x-auto text-secondary">
    <thead class="w-full text-secondary bg-accent-light bg-opacity-25 p-4">
      <tr :class="`grid-cols-${columns.length}`" class="tableGrid">
        <slot name="head">
          <th
            v-for="({ name }, index) of columns"
            :key="index"
            class="text-left max-w-full"
          >
            {{ name }}
          </th>
        </slot>
      </tr>
    </thead>
    <tbody class="w-full">
      <slot name="body">
        <tr
          v-for="{ id, record } of data"
          :key="id"
          class="block px-4 border-b border-accent-default w-full py-2"
        >
          <div :class="`grid-cols-${columns.length}`" class="tableGrid">
            <td
              v-for="({ content: field }, index) of record"
              :key="index"
              class="flex items-center text-left overflow-x-auto"
            >
              <slot :name="columns[index].name" :record="record" :id="id">
                <GenderComponent
                  v-if="columns[index].type === ColumnTypes.GENDER"
                  :type="field"
                  class="max-w-full"
                />
                <img
                  v-else-if="columns[index].type === ColumnTypes.IMAGE"
                  :src="field"
                  class="w-16 h-auto"
                />
                <span v-else> {{ field }} </span>
              </slot>
            </td>
          </div>
        </tr>
      </slot>
    </tbody>
  </table>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import {
  Columns,
  ColumnTypes,
  TableRecord,
} from "@/components/table/table.types";
import GenderComponent from "@/components/genderComponent/GenderComponent.vue";

export default defineComponent({
  name: "Table",
  emits: ["click"],
  components: {
    GenderComponent,
  },
  props: {
    columns: {
      type: Array as PropType<Columns[]>,
      required: true,
    },
    data: {
      type: Array as PropType<TableRecord[]>,
      default: () => [],
    },
  },
  setup() {
    return {
      ColumnTypes,
    };
  },
});
</script>

<style lang="scss" scoped>
table {
  thead,
  tbody {
    min-width: 40rem;
  }

  .tableGrid {
    @apply grid gap-4 container mx-auto w-full;
  }
}
</style>
