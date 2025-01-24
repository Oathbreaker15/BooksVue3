<script setup lang="ts">
  import { computed } from 'vue';

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

  // eslint-disable-next-line vue/return-in-computed-property
  const imgClass = computed(() => {
    if (props.imgName === 'nothing-found.svg') {
      return 'nothing-found';
    } else if (props.imgName === 'books.svg') {
      return 'books';
    }
  });
</script>

<template>
  <section class="info_block__wrapper">
    <h1 class="info_block__header">{{header}}</h1>

    <section v-if="imgName?.length" :class="`info_block__img _${imgClass}`" />
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