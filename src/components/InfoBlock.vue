<script setup lang="ts">
import { toRefs } from 'vue'

type AllowedImageClasses = 'nothing-found' | 'books'

interface IProps {
  header: string
  textContent: string
  imgClass: AllowedImageClasses
}

const props = defineProps<IProps>()

const { header, textContent, imgClass } = toRefs(props)
</script>

<template>
  <section class="info-block">
    <h1 class="info-block__header g-heading-1">{{ header }}</h1>

    <section v-if="imgClass?.length" :class="`info_block__img _${imgClass}`" />
    <div class="info-block__info">
      {{ textContent }}
    </div>
  </section>
</template>

<style scoped lang="scss">
.info-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  &__header {
    margin-top: 0;
  }

  &__img {
    width: 184px;
    height: 184px;

    &._nothing-found {
      background: url(@/assets/icons/nothing-found.svg) no-repeat 0 0;
      background-size: cover;
    }

    &._books {
      background: url(@/assets/icons/books.svg) no-repeat 0 0;
      background-size: cover;
    }
  }

  &__info {
    font-size: 19px;
    line-height: 24px;
    max-width: 266px;
    text-align: center;
    margin-top: 16px;
  }
}
</style>
