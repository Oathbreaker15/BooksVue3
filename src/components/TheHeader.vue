<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { computed, ref, onBeforeUnmount } from 'vue'

interface IProps {
  favsAmount: number
}

const props = defineProps<IProps>()

const route = useRoute()
const path = computed(() => route.path)

const isSticky = ref(false)
const scrollThreshold = 64
const isMobile = computed(() => window.innerWidth <= 639)

const handleScroll = () => {
  if (isMobile.value) {
    isSticky.value = window.scrollY > scrollThreshold
  }
}

window.addEventListener('scroll', handleScroll)

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header :class="['header', { __sticky: isSticky }]">
    <RouterLink to="/" class="header-link">
      <div class="header__logo">B</div>
    </RouterLink>

    <RouterLink to="/search" class="search-book-btn-wrapper">
      <section :class="['search-book-btn', { _active: path === '/search' }]">
        <div class="search-book-btn__icon"></div>
        <span class="search-book-btn__title">Поиск книг</span>
      </section>
    </RouterLink>

    <RouterLink to="/favorites" class="favorites-btn-wrapper">
      <section :class="['favorites-btn', { _active: path === '/favorites' }]">
        <div class="favorites-btn__icon"></div>
        <span class="favorites-btn__title">Избранное</span>
        <div :class="['favorites-btn__count', { __hidden: !props.favsAmount }]">
          {{ props.favsAmount }}
        </div>
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
  }

  @include headerBtnCommon();
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
  }

  @include headerBtnCommon();

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
}

@media (max-width: 639px) {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;

    &.__sticky {
      position: fixed;
      top: 0;
      z-index: 1;
      background: white;
      width: calc(100% - 32px);
    }
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
    position: relative;

    &._active {
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
      top: -10px;
    }
  }
}

.__hidden {
  display: none;
}
</style>
