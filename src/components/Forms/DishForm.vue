<script setup lang="ts">
import { ref } from 'vue';
import CrushTextField from '@nabux-crush/crush-text-field'
import CrushSelect from '@nabux-crush/crush-select'
import { itemRules } from '@/utils/Validations';
import { Category, ItemLabels } from '@/enums';

const emit = defineEmits(['submit'])

const form = ref({
  category: '',
  name: '',
  price: ''
});
const categories = [Category.DRINKS, Category.MEALS];

function submitForm() {
  emit('submit', form.value);
  form.value = { category: '', name: '', price: '' };
}
</script>

<template>
  <div>
    <CrushSelect
      v-model="form.category"
      :options="categories"
      label="Categoría"
    />
    <CrushTextField
      v-model="form.name"
      :label="form.category === Category.DRINKS ? ItemLabels.DRINK_NAME : ItemLabels.MEAL_NAME"
      :valid-rules="itemRules.nameValidation"
    />
    <CrushTextField
      v-model="form.price"
      :valid-rules="itemRules.priceValidation"
      :prependContent="'$'"
      label="Precio"
    />
    <button @click="submitForm">Agregar</button>
  </div>
</template>

