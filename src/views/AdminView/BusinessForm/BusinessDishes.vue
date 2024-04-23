<script setup lang="ts">
import { computed, reactive, watchEffect } from 'vue';
import CrushTextField from '@nabux-crush/crush-text-field'
import CrushSelect from '@nabux-crush/crush-select'

import { itemRules } from '@/utils/Validations';
import { Category, ItemLabels } from '@/enums';

const emit = defineEmits(['update:isValid', 'update:items'])

const items = reactive<{ category: string; name: string; price: string; }[]>([
  { 
    category: '',
    name: '', 
    price: '' 
  }
]);
const categories = [Category.DRINKS, Category.MEALS];

function addItem () {
  items.push({
    category: '',
    name: '',
    price: ''
  });
  console.log('itemssForm: ', items)
};
function removeItem (index: number) {
  items.splice(index, 1);
};

watchEffect(() => {
  if (items.length > 1) {
    emit('update:isValid', true);
    watchEffect(() => {
    emit('update:items', items);
  });
  } else {
    emit('update:isValid', false);
  }
});
</script>

<template>
  <div class="container">
    <p class="container-title">Ahora solo faltan los platos y bebidas 😁😄</p>
    <div v-for="(item, index) in items" :key="index" class="container-form">
      <CrushSelect
        :value="item.category"
        :options="categories"
        label="Categoría"
        @update:value="(val: string) => item.category = val"/>
      <CrushTextField
        v-model="item.name"
        :label="
          item.category === Category.DRINKS 
          ? ItemLabels.DRINK_NAME 
          : ItemLabels.MEAL_NAME"
        :valid-rules="itemRules.nameValidation"/>
      <CrushTextField
        v-model="item.price"
        :valid-rules="itemRules.priceValidation"
        :prependContent="'$'" 
        label="Precio"
        />
      <button 
        @click="removeItem(index)"
        class="container-button container-button-remove">
        Eliminar
      </button>
    </div>
    <button
      @click.prevent="addItem"
      class="container-button">
      Agregar
    </button>
  </div>
</template>

<style lang="scss" scoped>
.container {
  &-title {
    font-size: 1.5rem;
    color: $pink;
    margin: 16px 0;
    text-align: center;
  }
  &-form {
    :deep(.form-container-label-select) {
      border: 1px solid $purple;
      color: $black;
      font-family: $primary-font;
      font-size: 1rem;
    }
  }
  &-button {
    background-color: $pink;
    border: none;
    border-radius: 8px;
    color: #fff;
    cursor: pointer;
    font-family: $primary-font;
    font-size: 1rem;
    padding: 8px 16px;
    width: 100%;
    &:hover {
      background-color: darken($pink, 10%);
    }
    &-remove {
      background-color: $black;
      margin: 24px 0;
      &:hover {
        background-color: darken($black, 10%);
      }
    }
  }
}
</style>