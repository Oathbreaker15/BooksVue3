<script setup lang="ts">
  import {defineProps, toRefs} from 'vue';
  import type {PropType} from 'vue';
  import CardItem from './CardItem.vue';
  import type { Card } from '@/types/card/card';

  const props = defineProps({
    list: {
      required: true,
      type: Array as PropType<Card[]>,
    },
  }); 

  const {list} = toRefs(props);
</script>

<template>
  <section class="books-tile__wrapper">
    <CardItem v-for="card in list" :key="card.key" :card="card" />
  </section>
</template>

<style scoped lang="scss">
  @import '../styles/mixins.scss';
  @import '../styles/vars.scss';

  .books-tile__wrapper {
    display: grid;
    grid-auto-rows: 1fr;
    column-gap: 24px;
    row-gap: 20px;
    width: 100%;
    // max-width: 1222px;
    margin: 0 auto;
    grid-template-columns: repeat(auto-fill,minmax(288px,1fr));
  }
</style>