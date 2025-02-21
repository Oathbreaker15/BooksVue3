<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'
import { favsStore } from '@/stores/favs'

const favStore = favsStore()
const favsAmount = computed(() => favStore.favsAmount)
const { checkListFromCache } = favStore

onMounted(() => {
  checkListFromCache('favsList')
})
</script>

<template>
  <main class="content">
    <TheHeader :favs-amount="favsAmount" />

    <RouterView />
  </main>
</template>

<style lang="scss">
@import '@/styles/global.scss';

.content {
  box-sizing: border-box;
  max-width: 1344px;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
}

@media (max-width: 639px) {
  h1 {
    font-size: 23px;
    line-height: 32px;
  }
}
</style>
