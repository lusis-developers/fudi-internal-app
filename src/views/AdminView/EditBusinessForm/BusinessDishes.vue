<script setup lang="ts">
import { computed, onMounted, reactive, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import CrushTextField from '@nabux-crush/crush-text-field'
import CrushSelect from '@nabux-crush/crush-select'

import { Category, ItemLabels } from '@/enums';
import useBusinessStore from '@/store/businessStore';
import ItemCard from '@/components/Cards/ItemCard.vue';
import { itemRules } from '@/utils/Validations';

const emit = defineEmits(['update:isValid', 'update:items', 'update:editing', 'update:cancel-editing'])

const businessStore = useBusinessStore();

let selectedDrinkName = ref('');
let selectedMealName = ref('');
const route = useRoute();
const categories = [Category.DRINKS, Category.MEALS];
const items = reactive<{ category: string; name: string; price: string; description: string; }[]>([{ 
  category: '',
  name: '', 
  price: '' ,
  description: ''
}]);
const drinks = computed(() => {
  return items.filter(item => item.category === Category.DRINKS && item.name !== '' && item.price !== '' && item.description !== '');
});
const meals = computed(() => {
  return items.filter(item => item.category === Category.MEALS && item.name !== '' && item.price !== '' && item.description !== '');
});
const news = computed(() => {
  return items.filter(item => (item.name === '' || item.name.length < 40) && (item.price === '' || item.price.length < 10) && (item.description === '' || item.description.length < 100));
})
function selectDrink(name: string) {
  selectedDrinkName.value = name;
}
function selectMeal(name: string) {
  selectedMealName.value = name;
}
function removeDrink () {
  const id = route.params.id as string;
  console.log('drink name: ', selectedDrinkName.value);
  if (id) {
    console.log('id en condicion', id)
    businessStore.removeDrinkFromBusiness(id, selectedDrinkName.value);
    const index = items.findIndex(item => item.name === selectedDrinkName.value && item.category === Category.DRINKS);
    if (index !== -1) {
      items.splice(index, 1);
    }
  }
};
function removeMeal () {
  const id = route.params.id as string;
  console.log('meal name: ', selectedMealName.value);
  if (id) {
    console.log('id en condicion', id)
    businessStore.removeMealFromBusiness(id, selectedDrinkName.value);
    const index = items.findIndex(item => item.name === selectedMealName.value && item.category === Category.MEALS);
    if (index !== -1) {
      items.splice(index, 1);
    }
  }
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
watchEffect(() => {
  if(news.value.length !== 0) {
    console.log('nuevossIfBefore', news.value)
    news.value.splice(1, Infinity);
    console.log('nuevossIfAfter', news.value)
  }
});
watchEffect(() => {
  items.filter(item => item.category === Category.DRINKS);
});

onMounted(async () => {
  const id = route.params.id;
  const response = businessStore.getBusinessById(id as any);
  if (response) {
    const {meals, drinks} = response;
    meals.forEach(meal => items.push({category: Category.MEALS, name: meal.name, price: meal.price, description: meal.description}));
    drinks.forEach(drink => items.push({category: Category.DRINKS, name: drink.name, price: drink.price, description: drink.description}));
  }
});
</script>

<template>
  <div class="container">
    <p class="container-title">
      Ahora echa un vistazo a los platos y bebidas 😁😄
    </p>
    <h2 class="container-subtitle">
      Agregar un nuevo item
    </h2>
      <div 
        v-for="(item, index) in news" 
        :key="index" 
        class="container-form">
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
            label="Precio" />
          <CrushTextField
            v-model="item.description"
            label="Descripción" />
      </div>
      <div class="container-buttons">
        <button 
          class="container-buttons-button"
          @click="$emit('update:editing')">
            Guardar
        </button>
        <button 
          class="container-buttons-button"
          @click="$emit('update:cancel-editing')">
            Cancelar
        </button>
      </div>
    <h2 class="container-subtitle">
      Bebidas
    </h2>
    <div class="container-cards">
      <ItemCard 
        v-for="item in drinks" 
        :key="item.name" 
        :name="item.name" 
        :price="item.price" 
        :description="item.description"
        :showRemoveButton="selectedDrinkName === item.name"
        @select="() => selectDrink(item.name)"
        @remove="removeDrink" />
    </div>
    <h2 class="container-subtitle">
      Platos
    </h2>
    <div class="container-cards">
      <ItemCard 
        v-for="item in meals" 
        :name="item.name"
        :price="item.price"
        :description="item.description"
        :showRemoveButton="selectedMealName === item.name"
        @select="() => selectMeal(item.name)"
        @remove="removeMeal" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  &-title {
    font-size: 1.5rem;
    font-weight: $font-weight-bold;
    color: $pink;
    margin: 16px 0;
    text-align: center;
  }
  &-subtitle {
    font-size: 1.5rem;
    text-align: center;
  }
  &-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
    align-items: center;
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
    font-family: $secondary-font;
    font-weight: $font-weight-bold;
    font-size: 1rem;
    border: none;
    cursor: pointer;
    width: 200px;
    border-radius: 8px;
    color: #fff;
    background-color: $pink;
    padding: 8px 16px;
    transition: background-color 0.5s ease-in;
    &:hover {
      background-color: darken($pink, 10%);
    }
  }
}
.button-remove{
  border: none;
  font-family: $secondary-font;
  font-size: $font-size-normal;
  color: #fff;
  background-color: $pink;
  padding: 8px 16px;
  border-radius: 8px;
  margin-top: 16px;
  transition: background-color 0.5s ease-in;
  &:hover {
    background-color: darken($pink, 10%);
  }
}
.container-buttons {
  display: flex;
  margin: 24px 0;
  gap: 40px;
  justify-content: center;
  align-items: center;
  &-button {
    font-family: $secondary-font;
    font-weight: $font-weight-bold;
    font-size: 1rem;
    border: none;
    cursor: pointer;
    width: 200px;
    border-radius: 8px;
    color: #fff;
    background-color: $black;
    padding: 8px 16px;
    transition: background-color 0.5s ease-in;
    &:hover {
      background-color: darken($black, 10%);
    }
  }
}
</style>