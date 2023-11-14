<script setup lang="ts">
import { watch } from 'vue';
import { storeToRefs } from 'pinia';
import TheSearch from '@/components/TheSearch.vue';
import CardList from '@/components/CardList.vue';
import ThePagination from '@/components/ThePagination.vue';
import TheLoading from '@/components/TheLoading.vue';
import InfoBlock from '@/components/InfoBlock.vue';
import { searchStore } from '@/stores/search';

const store = searchStore();
const {list, searchQuery, formattedList, paginationState, loading, numFound, isListNotEmpty} = storeToRefs(store);

function handleItemsPerPage() {
  window.innerWidth < 1316 ? store.handleItemsPerPage(6) : store.handleItemsPerPage(8);
}

watch(()=>searchQuery.value, (searchQuery)=>{
  if (!searchQuery.length) {
    store.resetSearchedState();
  }
})

handleItemsPerPage();
window.addEventListener('resize', ()=>{
  handleItemsPerPage();
})
</script>

<template>
  <TheSearch/>

  <transition-group name="fade">
    <TheLoading v-if="loading" key="1"/>

    <section v-else :class="['books-tile', {'_empty': !list.length}]" key="2">
      <h2 v-if="isListNotEmpty" class="books-tile__header">Найдено книг – {{ numFound }}</h2>

      <CardList v-if="list.length" :list="formattedList"/>  
      
      <InfoBlock v-else-if="store.isSearchEmpty" 
                :header="'Ничего не найдено'" 
                :text-content="'Пожалуйста, проверьте искомое значение на опечатки.'" 
                :img-name="'nothing-found.svg'" />

      <InfoBlock v-else
                :header="'Воспользуйтесь строкой поиска'" 
                :text-content="'Здесь будут отображаться найденные книги.'" />
    </section>
  </transition-group>

  <ThePagination :list="list" :pagination-state="paginationState" />
</template>

<style scoped lang="scss">
  @import '../styles/mixins.scss';
  @import '../styles/vars.scss';

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