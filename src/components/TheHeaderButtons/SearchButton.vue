<script setup lang="ts">
import { RouterLink } from 'vue-router'

interface IProps {
  isActive: boolean
}

defineProps<IProps>()
</script>

<template>
  <RouterLink to="/search" class="search-btn-wrapper">
    <section :class="['search-btn', { 'search-btn_active': isActive }]">
      <div class="search-btn__icon"></div>
      <span class="search-btn__title">Поиск книг</span>
    </section>
  </RouterLink>
</template>

<style scoped lang="scss">
@import '@/styles/mixins.scss';
@import '@/styles/vars.scss';

.search-btn-wrapper {
  @include flexCenteredBetween();
  margin-left: auto;
  text-decoration: none;
}

.search-btn {
  @include flexCenteredBetween();
  margin-left: auto;

  &_active {
    @extend .search-btn;

    font-weight: bold;
  }

  &__icon {
    @include iconsCommonSize();
    background: url(@/assets/icons/search.svg) no-repeat 0 0;
  }

  @include headerBtnCommon();

  @media (max-width: 639px) {
    .search-btn__title {
      display: none;
    }

    .search-btn {
      border: 2px solid transparent;

      &_active {
        @include activeMobIcon();
      }

      &__icon {
        @include iconsCommonSizeMob();
      }
    }
  }
}
</style>
