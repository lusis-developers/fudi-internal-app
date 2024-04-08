<script setup>
import logo from '@/assets/fudi-bot-logo.png'
</script>

<template>
  <header class="admin-header">
    <img :src="logo" alt="Logo" class="logo" />
    <h1 class="username">denissita</h1>
  </header>
</template>

<style scoped>
.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  .logo {
    height: 50px;
  }
  .username {
    font-size: 1.5rem;
    color: #333;
  }
}
</style>