<script setup lang="ts">
import { toRefs } from 'vue';
import CardList from '@/components/CardList.vue';
import ThePagination from '@/components/ThePagination.vue';
import InfoBlock from '@/components/InfoBlock.vue';

import { favsStore } from '@/stores/favs';

const store = favsStore();
const {list, formattedList, paginationState, isListNotEmpty} = toRefs(store);

function handleItemsPerPage() {
  window.innerWidth < 1316 ? store.handleItemsPerPage(6) : store.handleItemsPerPage(8);
}

handleItemsPerPage();
window.addEventListener('resize', ()=>{
  handleItemsPerPage();
})
</script>

<template>
  <section :class="['books-tile', {'_empty': !list.length}]" key="2">
    <h2 v-if="isListNotEmpty" class="books-tile__header">Избранные книги</h2>

    <CardList v-if="list.length" :list="formattedList"/>
    <InfoBlock v-else 
                :header="'Здесь пока ничего нет'" 
                :text-content="'Добавляйте любимые книги из поиска, чтобы создать коллекцию.'" 
                :img-name="'books.svg'" />

    <ThePagination :list="list" :pagination-state="paginationState" />
  </section>
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