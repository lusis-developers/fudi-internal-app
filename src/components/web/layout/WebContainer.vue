<script setup>
import { RouterView } from 'vue-router';
import WebHeader from '@/components/web/layout/WebHeader.vue';
</script>

<template>
  <div class="main-app-wrapper">
    <WebHeader/>
    <div class="main-app-wrapper-view">
      <RouterView/>
    </div>
  </div>
</template>