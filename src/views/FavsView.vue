<script setup lang="ts">
import { storeToRefs } from 'pinia';
import CardList from '@/components/CardList.vue';
import ThePagination from '@/components/ThePagination.vue';
import InfoBlock from '@/components/InfoBlock.vue';
import { initResizeHandler } from '@/composition/handleResize';

import { favsStore } from '@/stores/favs';

const store = favsStore();
const { list, formattedList, paginationState, isListNotEmpty } = storeToRefs(store);
const { toPrevPage, toNextPage } = store;

initResizeHandler(store);
</script>

<template>
  <section :class="['books-tile', { '_empty': !list.length }]" key="2">
    <template v-if="isListNotEmpty">
      <h2 class="books-tile__header">Избранные книги ({{ list.length }} шт.)</h2>
      <CardList v-if="list.length" :list="formattedList" />
    </template>

    <InfoBlock v-else 
              :header="'Здесь пока ничего нет'"
              :text-content="'Добавляйте любимые книги из поиска, чтобы создать коллекцию.'" 
              :img-class="'books'" />
  </section>

  <ThePagination v-if="isListNotEmpty" 
                    :list="list" 
                    :pagination-state="paginationState" 
                    @to-prev-page="toPrevPage"
                    @to-next-page="toNextPage" />
</template>

<style scoped lang="scss">
.books-tile {
  padding: 30px;
  box-sizing: border-box;

  &._empty {
    flex-grow: 1;
  }

  &__header {
    font-size: 24px;
    line-height: 32px;
  }
}

@media (max-width: 639px) {
  .books-tile {
    padding: 0px;
  }
}
</style>