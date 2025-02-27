<script setup lang="ts">
import { RouterLink } from 'vue-router'

interface IProps {
  isActive: boolean
  count: number
}

defineProps<IProps>()
</script>

<template>
  <RouterLink to="/favorites" class="favorites-btn-wrapper">
    <section :class="['favorites-btn', { 'favorites-btn_active': isActive }]">
      <div class="favorites-btn__icon"></div>
      <span class="favorites-btn__title">Избранное</span>
      <div :class="['favorites-btn__count', { 'favorites-btn__count_hidden': !count }]">
        {{ count }}
      </div>
    </section>
  </RouterLink>
</template>

<style scoped lang="scss">
@import '@/styles/mixins.scss';
@import '@/styles/vars.scss';

.favorites-btn-wrapper {
  text-decoration: none;
}

.favorites-btn {
  @include flexCenteredBetween();
  margin-left: 32px;

  &_active {
    @extend .favorites-btn;

    font-weight: bold;
  }

  &__icon {
    @include iconsCommonSize();
    background: url(@/assets/icons/favorites.svg) no-repeat 0 0;
  }

  @include headerBtnCommon();

  &__count {
    width: 24px;
    height: 24px;
    color: $main-color;
    border: 1px solid $main-color;
    border-radius: 50%;
    margin-left: 12px;
    display: flex;
    align-items: center;
    justify-content: center;

    &_hidden {
      display: none;
    }
  }

  @media (max-width: 639px) {
    .favorites-btn__title {
      display: none;
    }

    .favorites-btn {
      border: 2px solid transparent;
      margin-left: 8px;
      position: relative;

      &_active {
        @include activeMobIcon();
      }

      &__icon {
        @include iconsCommonSizeMob();
      }

      &__count {
        position: absolute;
        z-index: 1;
        background: white;
        font-weight: bold;
        top: 6px;
      }
    }
  }
}
</style>
