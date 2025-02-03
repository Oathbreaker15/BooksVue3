<script setup lang="ts">
import { toRefs } from 'vue';
import type { Card } from '@/types/card/card';
import type { PaginationState } from '@/types/pagination/paginationState';

interface Props {
  list: Card[],
  paginationState: PaginationState,
}

const props = defineProps<Props>();

const { list, paginationState } = toRefs(props);

const emit = defineEmits<{
  'to-next-page': [],
  'to-prev-page': []
}>()

const toNextPage = () => {
  emit('to-next-page');
}

const toPrevPage = () => {
  emit('to-prev-page');
}
</script>

<template>
  <section class="pagination" v-if="list.length">
    <section v-if="paginationState.currentPage > 0" @click="toPrevPage" class="pagination-nav__prev">
      <div class="pagination-nav__icon--prev"></div>
      <div class="pagination-nav__text">Предыдущая страница</div>
    </section>

    <section v-if="paginationState.currentPage !== paginationState.totalPages" @click="toNextPage"
      class="pagination-nav__next">
      <div class="pagination-nav__text">Следующая страница</div>
      <div class="pagination-nav__icon--next"></div>
    </section>
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
        background: url(@/assets/icons/pagination_arrow.svg) no-repeat 0 0;
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