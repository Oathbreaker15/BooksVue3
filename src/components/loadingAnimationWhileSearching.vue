<script setup lang="ts">
interface Props {
  text?: string
}

withDefaults(defineProps<Props>(), {
  text: 'ПОИСК'
})
</script>

<template>
  <section class="loading" key="1">
    <div class="loading__icon"></div>
    <div class="loading__inner">{{ text }}</div>
  </section>
</template>

<style scoped lang="scss">
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 48px;
  padding: 80px 0;
  line-height: 60px;

  &__icon {
    width: 100px;
    height: 120px;
    background: url(@/assets/icons/book-gif.gif) no-repeat 0 0;
    background-size: contain;
  }

  &__inner {
    position: relative;
  }
}
</style>