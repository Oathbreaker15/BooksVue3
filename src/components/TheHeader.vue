<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { computed } from 'vue'
import SearchButton from './TheHeaderButtons/SearchButton.vue'
import FavsButton from './TheHeaderButtons/FavsButton.vue'

interface IProps {
  favsAmount: number
  isSticky: boolean
}

const props = defineProps<IProps>()

const route = useRoute()
const path = computed(() => route.path)
</script>

<template>
  <header :class="['header', { header_sticky: isSticky }]">
    <RouterLink to="/" class="header__link">
      <div class="header__logo">B</div>
    </RouterLink>

    <SearchButton :is-active="path === '/search'" />

    <FavsButton :is-active="path === '/favorites'" :count="props.favsAmount" />
  </header>
</template>

<style scoped lang="scss">
@import '@/styles/mixins.scss';
@import '@/styles/vars.scss';

.header {
  @include flexCenteredBetween();
  padding: 40px 30px;

  &__link {
    text-decoration: none;
  }

  &__logo {
    @include flexCentered();

    width: 40px;
    height: 40px;
    font-size: 32px;
    font-weight: bold;
    border-radius: 50%;
    background-color: $main-color;
    color: white;
  }
}

@media (max-width: 639px) {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;

    &_sticky {
      position: fixed;
      top: 0;
      z-index: 1;
      background: white;
      width: calc(100% - 32px);
      padding: 12px 16px;
      left: 0;

      &::before {
        content: '';
        display: block;
        position: absolute;
        left: -16px;
        bottom: 0;
        width: 100vw;
        z-index: 1;
        height: 12px;
        box-shadow: 0 7px 8px 0 rgba(0, 13, 51, 0.12);
      }
    }
  }
}
</style>
