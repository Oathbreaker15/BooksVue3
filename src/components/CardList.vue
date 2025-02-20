<script setup lang="ts">
import { toRefs } from 'vue'
import CardItem from './CardItem.vue'
import type { Card } from '@/types/card/card'

interface IProps {
  list: Card[]
}

const props = defineProps<IProps>()

const { list } = toRefs(props)
</script>

<template>
  <section class="books-tile__wrapper">
    <CardItem v-for="card in list" :key="card.key" :card="card" />
  </section>
</template>

<style scoped lang="scss">
@import '@/styles/mixins.scss';
@import '@/styles/vars.scss';

.books-tile__wrapper {
  display: grid;
  grid-auto-rows: 1fr;
  column-gap: 24px;
  row-gap: 20px;
  width: 100%;
  margin: 0 auto;
  grid-template-columns: repeat(auto-fill, minmax(288px, 1fr));
}
</style>
