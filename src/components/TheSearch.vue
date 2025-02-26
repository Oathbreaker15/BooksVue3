<script setup lang="ts">
const emit = defineEmits<{
  'submit-search': [string]
}>()

const handleSubmit = (e: Event) => {
  if (!(e instanceof SubmitEvent)) return
  const target = e.currentTarget
  if (!(target instanceof HTMLFormElement)) return
  const value = new FormData(target).get('search')?.toString() || ''
  emit('submit-search', value)
}
</script>

<template>
  <section class="search">
    <form class="search__form" @submit.prevent="handleSubmit">
      <span class="search__text-input-icon"></span>
      <input
        class="search__text-input"
        type="text"
        name="search"
        placeholder="Найти книгу или автора..."
      />
      <button class="search__submit-btn" type="submit" aria-label="Найти"></button>
    </form>
  </section>
</template>

<style scoped lang="scss">
@import '@/styles/vars.scss';

.search {
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
    background-color: $book-item-background-color;
    height: 56px;
    border: none;
    box-sizing: border-box;
    border-radius: 5px;

    &::placeholder {
      color: $main-color;
    }
  }

  &__text-input-icon {
    width: 24px;
    height: 24px;
    display: block;
    position: absolute;
    left: 12px;
    background: url(@/assets/icons/search.svg) no-repeat 0 0;
  }

  &__submit-btn {
    margin-left: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 56px;
    height: 56px;
    background: $main-color;
    border-radius: 5px;
    border: none;
    flex-shrink: 0;
  }

  &__submit-btn::before {
    content: '';
    width: 24px;
    height: 24px;
    background: url(@/assets/icons/search-white.svg) no-repeat 0 0;
    background-size: cover;
  }
}

@media (max-width: 639px) {
  .search {
    padding: 0;

    &__text-input {
      padding: 12px 12px 12px 32px;
      height: 40px;

      &-icon {
        left: 8px;
        top: 9px;
      }
    }

    &__submit-btn {
      width: 40px;
      height: 40px;
    }
  }
}
</style>
