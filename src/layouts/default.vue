<script setup lang="ts">
  import WebHeader from '@/components/web/WebHeader.vue'
</script>

<template>
  <header class="header">
    este el header default
  </header>
  <main>
    <slot/>
  </main>
  <footer class="footer">
    este el footer default
  </footer>
</template>