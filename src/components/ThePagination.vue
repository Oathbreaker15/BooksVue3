<script setup lang="ts">
import { toRefs } from 'vue'
import type { Card } from '@/types/card/card'
import type { PaginationState } from '@/types/pagination/paginationState'
import { useDeviceType } from '@/composition/useDeviceType'

interface IProps {
  list: Card[]
  paginationState: PaginationState
}

const props = defineProps<IProps>()

const { list, paginationState } = toRefs(props)

const emit = defineEmits<{
  'to-next-page': []
  'to-prev-page': []
}>()

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const { isMobile } = useDeviceType()

const toNextPage = () => {
  if (isMobile.value) scrollToTop()
  emit('to-next-page')
}

const toPrevPage = () => {
  if (isMobile.value) scrollToTop()
  emit('to-prev-page')
}
</script>

<template>
  <section class="pagination-nav" v-if="list.length">
    <section
      v-if="paginationState.currentPage > 0"
      @click="toPrevPage"
      class="pagination-nav__prev"
    >
      <div class="pagination-nav__icon_prev"></div>
      <div class="pagination-nav__text">Предыдущая страница</div>
    </section>

    <section
      v-if="paginationState.currentPage !== paginationState.totalPages"
      @click="toNextPage"
      class="pagination-nav__next"
    >
      <div class="pagination-nav__text">Следующая страница</div>
      <div class="pagination-nav__icon_next"></div>
    </section>
  </section>
</template>

<style scoped lang="scss">
.pagination-nav {
  display: flex;
  justify-content: space-between;
  padding: 20px 30px;
  margin-top: auto;

  &__next {
    margin-left: auto;
  }

  &__prev,
  &__next {
    display: flex;
    cursor: pointer;
    @media screen and (min-width: 1095px) {
      &:hover {
        text-decoration: underline;
      }
    }
  }

  &__icon {
    &_prev,
    &_next {
      width: 20px;
      height: 20px;
      background: url(@/assets/icons/pagination_arrow.svg) no-repeat 0 0;
    }

    &_next {
      rotate: 180deg;
    }
  }
}

@media (max-width: 639px) {
  .pagination-nav {
    padding: 16px 0;

    &__text {
      display: none;
    }
  }
}
</style>
