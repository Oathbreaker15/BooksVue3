<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import TheHeader from '@/components/TheHeader.vue';
</script>

<template>
  <main class="content">
    <TheHeader/>
    <RouterView/>
  </main>
</template>

<style lang="scss">
  @import 'https://fonts.googleapis.com/css?family=Open+Sans';
  @import 'styles/vars.scss';
  @import 'styles/mixins.scss';

  div#app {
    height: 100vh;
  }

  body {
    color: $main;
    font-size: 14px;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    position: relative;
    line-height: 20px;
    font-family: 'Open Sans', sans-serif;
  }

  h1 {
    font-size: 32px;
    line-height: 40px;
  }

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
