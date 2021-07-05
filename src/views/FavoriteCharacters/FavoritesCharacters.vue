<template>
  <Table :columns="columns" :data="data">
    <template #[lastSlotName]="slotProps">
      <StarButton @click="removeFavorite(slotProps.id)" :active="true" />
    </template>
  </Table>
  <div class="pagination max-w-full px-4 py-10 overflow-x-auto">
    <Pagination
      :amountOfPages="amountOfPages"
      :currentPage="currentPage"
      :visiblePages="5"
      @click="changePage"
      class="mx-auto container"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import { LocalStorage } from "@/types";
import {
  Columns,
  ColumnTypes,
  TableRecord,
} from "@/components/table/table.types";
import Table from "@/components/table/Table.vue";
import StarButton from "@/components/starButton/StarButton.vue";
import Pagination from "@/components/table/pagination/Pagination.vue";

export default defineComponent({
  name: "FavoriteCharacters",
  components: {
    Table,
    StarButton,
    Pagination,
  },
  setup() {
    const currentPage = ref<number>(1);
    const columns = ref<Columns[]>([
      {
        type: ColumnTypes.IMAGE,
        name: "Photo",
      },
      {
        type: ColumnTypes.TEXT,
        name: "Character ID",
      },
      {
        type: ColumnTypes.TEXT,
        name: "Name",
      },
      {
        type: ColumnTypes.GENDER,
        name: "Gender",
      },
      {
        type: ColumnTypes.TEXT,
        name: "Species",
      },
      {
        type: ColumnTypes.TEXT,
        name: "Last Episode",
      },
      {
        type: ColumnTypes.ACTION,
        name: "Add To Favorites",
      },
    ]);
    const lastSlotName = ref<string>(
      columns.value[columns.value.length - 1].name
    );
    const data = ref<TableRecord[]>([]);
    const contentPerPage = ref<number>(8);
    const amountOfPages = ref<number>(0);

    watchEffect(() => {
      const FavoriteCharacters = localStorage.getItem(LocalStorage.FAVORITE);

      data.value = [];

      if (FavoriteCharacters) {
        const mapOfFavorite = JSON.parse(FavoriteCharacters);

        amountOfPages.value = Math.ceil(
          Object.keys(mapOfFavorite).length / contentPerPage.value
        );

        if (currentPage.value > amountOfPages.value) {
          currentPage.value = amountOfPages.value;
        }

        const from = (currentPage.value - 1) * contentPerPage.value;
        const to = Math.min(
          currentPage.value * contentPerPage.value,
          Object.keys(mapOfFavorite).length
        );

        for (let i = from; i < to; i++) {
          const character = mapOfFavorite[Object.keys(mapOfFavorite)[i]];

          data.value.push({
            id: character.id,
            record: [
              { content: character.image },
              { content: character.id },
              { content: character.name },
              { content: character.gender },
              { content: character.species },
              {
                content:
                  character.episode[character.episode.length - 1].episode,
              },
              { content: "" },
            ],
          });
        }
      } else {
        amountOfPages.value = 0;
      }
    });

    const changePage = (page: number): void => {
      currentPage.value = page;
    };

    const removeFavorite = (id: string): void => {
      const FavoriteCharacters = localStorage.getItem(LocalStorage.FAVORITE);

      if (FavoriteCharacters) {
        const mapOfFavorite = JSON.parse(FavoriteCharacters) as Record<
          string,
          Record<string, unknown>
        >;
        delete mapOfFavorite[id];
        localStorage.setItem(
          LocalStorage.FAVORITE,
          JSON.stringify(mapOfFavorite)
        );

        data.value = data.value.filter((el) => el.id !== id);

        return;
      }
    };

    return {
      currentPage,
      contentPerPage,
      amountOfPages,
      columns,
      lastSlotName,
      data,
      changePage,
      removeFavorite,
    };
  },
});
</script>
<style lang="scss" scoped></style>
