<template>
  <Table :columns="columns" :data="data">
    <template #[lastSlotName]="slotProps">
      <StarButton
        @click="setFavorite(slotProps.id)"
        :active="isFavoriteCharacter(slotProps.id)"
      />
    </template>
  </Table>
  <div class="pagination px-4 py-10">
    <Pagination
      :amountOfPages="amountOfPages"
      :currentPage="currentPage"
      class="mx-auto container"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, inject, watchEffect } from "vue";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client/core";
import { FetchResponse } from "@/api/useFetch.types";
import { fetchRecords } from "@/api/useFetch";
import {
  Columns,
  ColumnTypes,
  TableRecord,
} from "@/components/table/table.types";
import Table from "@/components/table/Table.vue";
import StarButton from "@/components/starButton/StarButton.vue";
import Pagination from "@/components/table/pagination/Pagination.vue";

export default defineComponent({
  name: "AllCharacters",
  components: {
    Table,
    StarButton,
    Pagination,
  },
  setup() {
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
        name: "add to favorites",
      },
    ]);
    const lastSlotName = ref<string>(
      columns.value[columns.value.length - 1].name
    );
    const records = ref<FetchResponse>({
      loading: true,
    });
    const data = ref<TableRecord[]>([]);
    const contentPerPage = ref<number>(8);
    const amountOfPages = ref<number>(0);

    if (apolloClient !== undefined) {
      records.value = fetchRecords(
        apolloClient,
        currentPage.value,
        contentPerPage.value
      );
    } else {
      console.error("Apollo client is undefined!");
    }

    watchEffect(() => {
      if (!records.value.loading && records.value.data !== undefined) {
        amountOfPages.value = Math.ceil(
          records.value.data.numberOfRecords / contentPerPage.value
        );

        records.value.data.records.forEach((record) => {
          data.value.push({
            id: record.id,
            record: [
              { content: record.image },
              { content: record.id },
              { content: record.name },
              { content: record.gender },
              { content: record.species },
              { content: record.episode[record.episode.length - 1].episode },
              { content: "" },
            ],
          });
        });
      }
    });

    const isFavoriteCharacter = (id: string): boolean => {
      return !!localStorage.getItem(id);
    };

    const setFavorite = (id: string): void => {
      if (records.value.data !== undefined) {
        for (let character of records.value.data.records) {
          if (character.id === id) {
            if (localStorage.getItem(id)) {
              localStorage.removeItem(id);
            } else {
              localStorage.setItem(id, JSON.stringify(character));
            }
            isFavoriteCharacter(id);
            return;
          }
        }
      }
    };

    return {
      contentPerPage,
      currentPage,
      amountOfPages,
      columns,
      lastSlotName,
      records,
      data,
      isFavoriteCharacter,
      setFavorite,
    };
  },
});
</script>
