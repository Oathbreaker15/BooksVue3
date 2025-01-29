<script setup lang="ts">
import { watch } from 'vue';
import { storeToRefs } from 'pinia';
import TheSearch from '@/components/TheSearch.vue';
import CardList from '@/components/CardList.vue';
import ThePagination from '@/components/ThePagination.vue';
import loadingAnimationWhileSearching from '@/components/loadingAnimationWhileSearching.vue';
import InfoBlock from '@/components/InfoBlock.vue';
import { searchStore } from '@/stores/search';
import { initResizeHandler } from '@/composition/handleResize';

const store = searchStore();
const {
  list,
  searchQuery,
  formattedList,
  paginationState,
  loading,
  numFound,
  isListNotEmpty,
  isSearchEmpty
} = storeToRefs(store);
const { toPrevPage, toNextPage, updateSearchQuery, fetchBooks } = store;
initResizeHandler(store);

watch(() => searchQuery.value, (newSearchQuery) => {
  if (!newSearchQuery.length) {
    store.resetSearchedState();
  }
})
</script>

<template>
  <TheSearch @update-search-query="updateSearchQuery" @submit-search="fetchBooks" />

  <transition-group name="fade">
    <loadingAnimationWhileSearching v-if="loading" key="1" />

    <section v-else :class="['books-tile', { '_empty': !list.length }]" key="2">
      <h2 v-if="isListNotEmpty" class="books-tile__header">Найдено книг – {{ numFound }}</h2>

      <CardList v-if="list.length" :list="formattedList" />

      <InfoBlock v-else-if="isSearchEmpty" :header="'Ничего не найдено'"
        :text-content="'Пожалуйста, проверьте искомое значение на опечатки.'" :img-class="'nothing-found'" />

      <InfoBlock v-else :header="'Воспользуйтесь строкой поиска'"
        :text-content="'Здесь будут отображаться найденные книги.'" :img-class="'books'" />
    </section>
  </transition-group>

  <ThePagination v-if="isListNotEmpty" :list="list" :pagination-state="paginationState" @to-prev-page="toPrevPage"
    @to-next-page="toNextPage" />
</template>

<style scoped lang="scss">
@import '@/styles/mixins.scss';
@import '@/styles/vars.scss';

.fade-enter-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

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
    padding: 0;
  }

  .info_block {
    &__wrapper {
      text-align: center;
    }

    &__info {
      margin-top: 0;
    }
  }

  .loading {
    flex-direction: column;

    &__icon {
      width: 120px;
      background-size: cover;
    }
  }
}
</style>