<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  showRemoveButton: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="card">
    <div class="card-container-body">
      <h5 class="card-container-body-title">
        {{ name }}
      </h5>
      <h5 class="card-container-body-subtitle">
        {{ description }}
      </h5>
      <h6 class="card-container-body-subtitle">
        precio: ${{ price }}
      </h6>
      <button 
        class="card-container-body-button" 
        @click="$emit('select')">
          Detalle
      </button>
    </div>
    <button
      v-if="showRemoveButton"
      class="button-remove"
      @click="$emit('remove')">
        Eliminar  
    </button> 
  </div>
</template>

<style scoped lang="scss">
.card {
  width: 100%;
  background-color: $pink;
  border-radius: 8px;
  padding: 16px;
  &-container-body {
    font-family: $secondary-font;
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    &-title {
      color: $white;
      text-align: center;
      font-size: 1.25rem;
      text-transform: capitalize;
    }
    &-subtitle {
      color: $white;
      text-align: center;
      font-size: 1rem;
    }
    &-button {
      font-family: $secondary-font;
      background-color: $white;
      color: $black;
      border: none;
      border-radius: 8px;
      padding: 8px;
      width: 100%;
      cursor: pointer;
    }
  }
}
.button-remove{
  font-family: $secondary-font;
  font-weight: $font-weight-bold;
  font-size: .9rem;
  border: none;
  cursor: pointer;
  width: 100%;
  border-radius: 8px;
  color: #fff;
  background-color: $black;
  padding: 8px 16px;
  margin-top: 8px;
}
</style>