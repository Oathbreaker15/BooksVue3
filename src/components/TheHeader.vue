<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import { computed } from 'vue';

interface Props {
  favsAmount: number
}

const props = defineProps<Props>()

const route = useRoute();
const path = computed(() => route.path)
</script>

<template>
  <header class="header">
    <RouterLink to="/" class="header-link">
      <div class="header__logo">B</div>
    </RouterLink>

    <RouterLink to="/search" class="search-book-btn-wrapper">
      <section :class="['search-book-btn', { '_active': path === '/search' }]">
        <div class="search-book-btn__icon"></div>
        <span class="search-book-btn__title">Поиск книг</span>
      </section>
    </RouterLink>

    <RouterLink to="/favorites" class="favorites-btn-wrapper">
      <section :class="['favorites-btn', { '_active': path === '/favorites' }]">
        <div class="favorites-btn__icon"></div>
        <span class="favorites-btn__title">Избранное</span>
        <div class="favorites-btn__count">{{ props.favsAmount }}</div>
      </section>
    </RouterLink>
  </header>
</template>

<style scoped lang="scss">
@import '@/styles/mixins.scss';
@import '@/styles/vars.scss';

.header {
  @include flexCenteredBetween();
  padding: 40px 30px;

  &-link {
    text-decoration: none;
  }

  &__logo {
    @include flexCentered();

    width: 40px;
    height: 40px;
    font-size: 32px;
    font-weight: bold;
    border-radius: 50%;
    background-color: $main;
    color: white;
  }
}

.search-book-btn,
.search-book-btn._active {
  @include flexCenteredBetween();
  margin-left: auto;

  &-wrapper {
    @include flexCenteredBetween();
    margin-left: auto;
    text-decoration: none;
  }

  &__icon {
    @include iconsCommonSize();
    background: url(@/assets/icons/search.svg) no-repeat 0 0;
    background-size: cover;
  }

  &__title {
    margin-left: 12px;
    text-decoration: none;
    color: $main;

    &:hover {
      text-decoration: underline;
    }
  }

  &._active {
    font-weight: bold;
  }
}

.favorites-btn,
.favorites-btn_active {
  @include flexCenteredBetween();
  margin-left: 32px;

  &-wrapper {
    text-decoration: none;
  }

  &__icon {
    @include iconsCommonSize();
    background: url(@/assets/icons/favorites.svg) no-repeat 0 0;
    background-size: cover;
  }

  &__title {
    margin-left: 12px;
    text-decoration: none;
    color: $main;

    &:hover {
      text-decoration: underline;
    }
  }

  &__count {
    width: 24px;
    height: 24px;
    color: $main;
    border: 1px solid $main;
    border-radius: 50%;
    margin-left: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &._active {
    font-weight: bold;
  }
}

@media (max-width: 639px) {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 0;
  }

  .search-book-btn__title,
  .favorites-btn__title {
    display: none;
  }

  .search-book-btn {
    border: 2px solid transparent;

    &._active {
      @include activeMobIcon();
    }

    &__icon {
      @include iconsCommonSizeMob();
    }
  }

  .favorites-btn {
    border: 2px solid transparent;
    margin-left: 8px;

    &._active {
      margin-left: 16px;
      @include activeMobIcon();
    }

    &__icon {
      @include iconsCommonSizeMob();
    }

    &__count {
      display: none;
    }
  }
}
</style>