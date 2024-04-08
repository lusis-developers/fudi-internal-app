<script setup lang="ts">
import Dashboard from '@/views/AdminView/components/Dashboard.vue'
</script>

<template>
  <div class="container">
    <h2 class="container-title">
      Negocios
    </h2>
    <div class="container-button">
      <RouterLink to="/admin/addBusiness" class="container-button-p">
        <i class="fa-solid fa-plus"/>
      </RouterLink>
    </div>
    <Dashboard/>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 1rem;
  &-title {
    text-align: left;
  }
  &-button {
    width: 100%;
    display: flex;
    justify-content: right;
    &-p {
      width: 1.5rem;
      height: 1.5rem;
      place-content: center;
      padding-right: 1rem;
      text-align: center;
    }
  }
}
</style>