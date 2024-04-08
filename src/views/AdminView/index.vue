<script setup lang="ts">
import Dashboard from '@/views/AdminView/components/Dashboard.vue'
</script>

<template>
  <div class="container">
    <h2 class="container-title">
      Negocios
    </h2>
    <Dashboard/>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 1rem;
  &-title {
    text-align: left;
  }
}
</style>