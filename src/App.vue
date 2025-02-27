<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { RouterView } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'
import { favsStore } from '@/stores/favs'
import { useDeviceType } from '@/composition/useDeviceType'

const favStore = favsStore()
const favsAmount = computed(() => favStore.favsAmount)
const { checkListFromCache } = favStore

const isSticky = ref(false)
const scrollThreshold = 64
const { isMobile } = useDeviceType()

const handleScroll = () => {
  if (isMobile.value) {
    isSticky.value = window.scrollY > scrollThreshold
  }
}

window.addEventListener('scroll', handleScroll)

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

onMounted(() => {
  checkListFromCache('favsList')
})
</script>

<template>
  <main :class="['content', { content_header_sticky: isSticky }]">
    <TheHeader :favs-amount="favsAmount" :is-sticky="isSticky" />

    <RouterView />
  </main>
</template>

<style lang="scss">
@use '@/styles/global.scss' as *;
</style>

<style scoped lang="scss">
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
  .heading-1 {
    font-size: 23px;
    line-height: 32px;
  }

  .content_header_sticky {
    padding-top: 64px;
  }
}
</style>
