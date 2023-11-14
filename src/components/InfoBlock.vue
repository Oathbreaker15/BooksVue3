<script setup lang="ts">
  const props = defineProps({
    header: {
      required: true,
      type: String,
    },
    textContent: {
      required: true,
      type: String,
    },
    imgName: {
      required: false,
      type: String,
    },
  }); 

  function getImageUrl() {
    // as unknown as string?? crazy shit
    return new URL(`../assets/icons/${props.imgName}`, import.meta.url) as unknown as string;
  }
</script>

<template>
  <section class="info_block__wrapper">
    <h1 class="info_block__header">{{header}}</h1>

    <img v-if="imgName?.length" :src="getImageUrl()" class="info_block__img" />
    <div class="info_block__info">
      {{ textContent }}
    </div>
  </section>
</template>

<style scoped lang="scss">
  .info_block {
    &__wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    &__header {
      margin-top: 0;
    }

    &__img {
      width: 184px;
      height: 184px;
      object-fit: cover;
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