<script setup lang="ts">
import { reactive } from 'vue';
import CrushTextField from '@nabux-crush/crush-text-field'
import CrushSelect from '@nabux-crush/crush-select'
import { Category, ItemLabels } from '@/enums';

const items = reactive([
  { 
    category: '',
    name: '', 
    price: '' 
  }
]);
const categories = [Category.DRINKS, Category.MEALS];

const itemRules = {
  nameValidation: [
    {
      validate: (value: string) => value.length >= 2,
      message: 'El nombre debe tener al menos 2 caracteres'
    },
  ],
  priceValidation: [
    {
      validate: (value: string) => !isNaN(Number(value)),
      message: 'El precio debe ser un número'
    },
  ],
};

function addItem() {
  items.push({ category: '', name: '', price: '' });
}

function removeItem(index: number) {
  items.splice(index, 1);
}
</script>

<template>
  <div class="container">
    <p>Ahora solo faltan los platos y bebidas 😁😄</p>
    <div v-for="(item, index) in items" :key="index" class="container-form">
      <CrushSelect
        :value="item.category"
        :options="categories"
        label="Categoría"
        @update:value="(val: string) => item.category = val"/>
      <CrushTextField
        v-model="item.name"
        :label="item.category === Category.DRINKS ? ItemLabels.DRINK_NAME : ItemLabels.MEAL_NAME"
        :valid-rules="itemRules.nameValidation"/>
      <CrushTextField
        v-model="item.price"
        label="Precio"
        :valid-rules="itemRules.priceValidation"/>
      <button @click="removeItem(index)">Eliminar</button>
    </div>
    <button @click.prevent="addItem">Agregar</button>
  </div>
</template>

<style lang="scss" scoped>
.container {
  &-form {
    :deep(.form-container-label-select) {
      border: 1px solid $purple;
      color: $black;
      font-family: $primary-font;
      font-size: 1rem;
    }
  }
}
</style>