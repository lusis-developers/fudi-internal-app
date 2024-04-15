<script setup lang="ts">
import { computed, onMounted, reactive, watchEffect } from 'vue';
import CrushTextField from '@nabux-crush/crush-text-field'
import CrushSelect from '@nabux-crush/crush-select'

import { itemRules } from '@/utils/Validations';
import { Category, ItemLabels } from '@/enums';
import { useRoute } from 'vue-router';
import useBusinessStore from '@/store/businessStore';

const route = useRoute();

const businessStore = useBusinessStore();

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
  console.log('itemss: ', items)
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

onMounted(async () => {
  const id = route.params.id;
  const response = businessStore.getBusinessById(id as any);
  if (response) {
    console.log('respuesta de itemsss: ', response)
    Object.assign(items, response);
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
        v-model:value="item.name"
        :label="
          item.category === Category.DRINKS 
          ? ItemLabels.DRINK_NAME 
          : ItemLabels.MEAL_NAME"
        :valid-rules="itemRules.nameValidation"/>
      <CrushTextField
        v-model:value="item.price"
        :valid-rules="itemRules.priceValidation"
        :prependContent="'$'" 
        label="Precio"
        />
      <button 
        @click="removeItem(index)"
        class="container-form-remove">
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
}
</style>