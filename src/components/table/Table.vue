<template>
  <table class="table">
    <thead class="container mx-auto">
      <slot name="head">
        <tr>
          <th
            v-for="({ name }, index) of columns"
            :key="index"
            class="capitalize"
          >
            {{ name }}
          </th>
        </tr>
      </slot>
    </thead>
    <tbody>
      <slot name="body">
        <tr v-for="(record, index) of data" :key="index">
          <td v-for="({ content: field }, index) of record" :key="index">
            <slot :name="columns[index].name">
              <component
                v-if="columns[index].type === ColumnTypes.ACTION"
                :is="field.icon"
                @click.stop="$emit('click', field.actionID)"
              />
              <GenderComponent
                v-else-if="columns[index].type === ColumnTypes.GENDER"
                :type="field"
              />
              <img
                v-else-if="columns[index].type === ColumnTypes.IMAGE"
                :src="field"
              />
              <span v-else> {{ field }} </span>
            </slot>
          </td>
        </tr>
      </slot>
    </tbody>
  </table>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Columns, ColumnTypes } from "@/components/table/table.types";
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
      type: Array,
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
