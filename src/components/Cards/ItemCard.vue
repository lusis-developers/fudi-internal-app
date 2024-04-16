<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="card">
    <div class="card-container-body">
      <h5 class="card-container-body-title">{{ name }}</h5>
      <h6 class="card-container-body-subtitle">precio: ${{ price }}</h6>
      <button @click="$emit('select')">Detalle</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  width: 100%;
  background-color: $pink;
  border-radius: 8px;
  padding: 16px;
  &-container-body {
    &-title {
      color: $black;
      text-align: center;
      font-size: $font-size-normal;
      font-family: $primary-font;
    }
    &-subtitle {
      color: $black;
      text-align: center;
      font-size: 1rem;
      font-family: $primary-font;
    }
  }
}
</style>