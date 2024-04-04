<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute();
const layout = ref(null);

onMounted(async () => {
  const layoutName = route.meta.layout || 'default';
  layout.value = (await import(`./layouts/${layoutName}.vue`)).default;
});
</script>

<template>
  <component :is="layout">
    <RouterView v-slot="{Component}">
      <component :is="Component" />
    </RouterView>
  </component>
</template>