<script setup lang="ts">
  import {defineProps, toRefs} from 'vue';
  import type {PropType} from 'vue';
  import type { Card } from '@/types/card/card';
  import type { PaginationState } from '@/types/pagination/paginationState';

  const props = defineProps({
    list: {
      required: true,
      type: Array as PropType<Card[]>,
    },
    paginationState: {
      required: true,
      type: Object as PropType<PaginationState>
    }
  }); 

  const {list, paginationState} = toRefs(props);

  function goToNextPage() {
        paginationState.value.currentPage++;            
    }

  function goToPrevPage() {
      paginationState.value.currentPage--;
  }
</script>

<template>
  <section class="pagination" v-if="list.length">
    <div v-if="paginationState.currentPage > 0" 
      @click="goToPrevPage" 
      class="pagination-nav__prev">
      <div class="pagination-nav__icon--prev"></div>
      <div class="pagination-nav__text">Предыдущая страница</div>
    </div>

    <div v-if="paginationState.currentPage !== paginationState.totalPages" 
    @click="goToNextPage" 
    class="pagination-nav__next">
      <div class="pagination-nav__text">Следующая страница</div>
      <div class="pagination-nav__icon--next"></div>
    </div>
  </section>
</template>

<style scoped lang="scss">
  .pagination {
    display: flex;
    justify-content: space-between;
    padding: 20px 30px;
    margin-top: auto;
  
    &-nav__next {
      margin-left: auto;
    }
  
    &-nav__prev,
    &-nav__next {
      display: flex;
      cursor: pointer;
  
      &:hover {
        text-decoration: underline;
      }
    }
  
    &-nav {
      &__icon {
        &--prev,
        &--next {
          width: 20px;
          height: 20px;
          background: url(../src/assets/icons/pagination_arrow.svg) no-repeat 0 0;
        }
  
        &--next {
          rotate: 180deg;
        }
      }
    }
  }

  @media (max-width: 639px) {
      .pagination {
        padding: 16px 0;

        &-nav__text {
          display: none;
        }
      }
    }
</style>