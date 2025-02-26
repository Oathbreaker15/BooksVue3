<script setup lang="ts">
import mobileBackground from '@/assets/back.jpg'
import { useDeviceType } from '@/composition/useDeviceType'
const { isMobile } = useDeviceType()
</script>

<template>
  <section class="home">
    <section class="home__info">
      <h1 class="home__info-header g-heading-1">BOOKS</h1>
      <p class="home__info-text">Добавляйте книги в избранное</p>
    </section>

    <img v-if="isMobile" class="home__mobile-img" :src="mobileBackground" />

    <video
      v-else
      class="home__video-content"
      autoplay
      loop
      muted
      poster="@/assets/video/mixkit-sheets-of-a-book-leafed-through-close-up-21588.mp4"
    >
      <source
        src="@/assets/video/mixkit-sheets-of-a-book-leafed-through-close-up-21588.mp4"
        type="video/mp4"
      />
    </video>
  </section>
</template>

<style scoped lang="scss">
@import '@/styles/vars.scss';

.home {
  overflow: hidden;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;

  &__info {
    &-header {
      color: $white-color;
      font-size: 72px;
      text-shadow:
        2px 0 $main-color,
        -2px 0 $main-color,
        0 2px $main-color,
        0 -2px $main-color,
        1px 1px $main-color,
        -1px -1px $main-color,
        1px -1px $main-color,
        -1px 1px $main-color;
    }

    &-text {
      font-size: 32px;
      line-height: 40px;
      padding: 20px 30px;
      color: $white-color;
      background: $main-color;
      border-radius: 8px;
    }
  }

  &__mobile-img,
  &__video-content {
    object-fit: cover;
    position: absolute;
    top: 120px;
    left: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    max-height: calc(100vh - 120px);
    z-index: -1;
  }

  &__mobile-img {
    filter: grayscale(1);
  }
}

@media (max-width: 639px) {
  .home {
    &__info {
      &-header {
        margin-bottom: 40px;
      }

      &-text {
        font-size: 19px;
        line-height: 24px;
        padding: 16px 24px;
      }
    }

    &__video-content {
      top: 88px;
      max-height: calc(100vh - 88px);
    }
  }
}
</style>
