<template>
  <div class="">
    {{ msg }}
  </div>
  <Table :columns="columns" :data="data" />
</template>

<script lang="ts">
import { defineComponent, ref, inject, watchEffect } from "vue";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client/core";
import { FetchResponse } from "@/api/useFetch.types";
import { fetchRecords } from "@/api/useFetch";
import Table from "@/components/table/Table.vue";
import { Columns, ColumnTypes, Field } from "@/components/table/table.types";

export default defineComponent({
  name: "AllCharacters",
  components: {
    Table,
  },
  setup() {
    const msg = ref<string>("Favorites All Characters");
    const currentPage = ref<number>(1);
    const apolloClient: ApolloClient<NormalizedCacheObject> | undefined =
      inject("DefaultApolloClient");
    const columns = ref<Columns[]>([
      {
        type: ColumnTypes.IMAGE,
        name: "photo",
      },
      {
        type: ColumnTypes.TEXT,
        name: "character id",
      },
      {
        type: ColumnTypes.TEXT,
        name: "name",
      },
      {
        type: ColumnTypes.GENDER,
        name: "gender",
      },
      {
        type: ColumnTypes.TEXT,
        name: "species",
      },
      {
        type: ColumnTypes.TEXT,
        name: "last episode",
      },
      {
        type: ColumnTypes.ACTION,
        name: "add to favorite",
      },
    ]);
    const records = ref<FetchResponse>({
      loading: true,
    });
    const data = ref<Field[][]>([]);

    if (apolloClient !== undefined) {
      records.value = fetchRecords(apolloClient, currentPage.value, 8);
    } else {
      console.error("Apollo client is undefined!");
    }

    watchEffect(() => {
      if (!records.value.loading && records.value.data !== undefined) {
        records.value.data.records.forEach((record) => {
          data.value.push([
            { content: record.image },
            { content: record.id },
            { content: record.name },
            { content: record.gender },
            { content: record.species },
            { content: record.episode[record.episode.length - 1].episode },
          ]);
        });
      }
    });

    return {
      msg,
      currentPage,
      columns,
      records,
      data,
    };
  },
});
</script>
