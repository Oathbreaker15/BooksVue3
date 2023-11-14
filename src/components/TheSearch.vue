<script setup lang="ts">
import { searchStore } from '@/stores/search'
const store = searchStore();

function updateSearchQuery(query: string) {
  store.searchQuery = query;
}
</script>

<template>
  <section class="search-book">
    <form class="search-book__form" @submit.prevent="store.updateModel">
        <span class="search-book__text-input-icon"></span>
        <input class="search-book__text-input" 
                type="text" 
                @input="updateSearchQuery(($event.target as HTMLInputElement).value)"
                placeholder="Найти книгу или автора..." 
                value="">
        <button class="search-book__submit-btn" type="submit"></button>
    </form>
  </section>
</template>

<style scoped lang="scss">
@import '../styles/vars.scss';

  .search-book {
    padding: 0 30px;
  
    &__form {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
    }
  
    &__text-input {
      width: 100%;
      padding: 12px 0 12px 48px;
      background-color: $book-item-background;
      height: 56px;
      border: none;
      box-sizing: border-box;
      border-radius: 5px;
  
      &::placeholder {
        color: $main;
      }
    }
  
    &__text-input-icon {
      width: 24px;
      height: 24px;
      display: block;
      position: absolute;
      left: 12px;
      background: url(../src/assets/icons/search.svg) no-repeat 0 0;
    }
  
    &__submit-btn {
      margin-left: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 56px;
      height: 56px;
      background: $main;
      border-radius: 5px;
      border: none;
      flex-shrink: 0;
    }
  
    &__submit-btn::before {
      content: '';
      width: 24px;
      height: 24px;
      background: url(../src/assets/icons/search-white.svg) no-repeat 0 0;
      background-size: cover;
    }
  }

  @media (max-width: 639px) {
    .search-book {
      padding: 0;
    }
  }
</style>