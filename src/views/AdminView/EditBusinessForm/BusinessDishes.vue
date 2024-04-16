<script setup lang="ts">
import { computed, onMounted, reactive, ref, watchEffect } from 'vue';
import CrushTextField from '@nabux-crush/crush-text-field'
import CrushSelect from '@nabux-crush/crush-select'
import { useRoute } from 'vue-router';

import { itemRules } from '@/utils/Validations';
import { Category, ItemLabels } from '@/enums';
import useBusinessStore from '@/store/businessStore';
import ItemCard from '@/components/Cards/ItemCard.vue';

const route = useRoute();

const businessStore = useBusinessStore();

const emit = defineEmits(['update:isValid', 'update:items'])

let selectedDrinkName = ref('');
const items = reactive<{ category: string; name: string; price: string; }[]>([
  { 
    category: '',
    name: '', 
    price: '' 
  }
]);
const categories = [Category.DRINKS, Category.MEALS];

const drinks = computed(() => {
  return items.filter(item => item.category === Category.DRINKS);
});
const meals = computed(() => {
  return items.filter(item => item.category === Category.MEALS);
});

function addItem () {
  items.push({
    category: '',
    name: '',
    price: ''
  });
  console.log('itemss: ', items)
};

function selectDrink(name: string) {
  selectedDrinkName.value = name;
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
  items.filter(item => item.category === Category.DRINKS);
});

onMounted(async () => {
  const id = route.params.id;
  const response = businessStore.getBusinessById(id as any);
  if (response) {
    const {meals, drinks} = response;
    meals.forEach(meal => items.push({category: Category.MEALS, name: meal.name, price: meal.price}));
    drinks.forEach(drink => items.push({category: Category.DRINKS, name: drink.name, price: drink.price}));
  }
});
</script>

<template>
  <div class="container">
    <p class="container-title">Ahora echa un vistazo a los platos y bebidas 😁😄</p>
    <h2 class="container-subtitle">Bebidas</h2>
    <div class="container-cards">
      <ItemCard 
        v-for="item in drinks" 
        :key="item.name" 
        :name="item.name" 
        :price="item.price" 
        @select="() => selectDrink(item.name)"/>
      <button v-if="selectedDrinkName" @click="removeDrink">Eliminar</button>
    </div>
    <h2 class="container-subtitle">Platos</h2>
    <div class="container-cards">
      <ItemCard v-for="item in meals" :name="item.name" :price="item.price"/>
      <button>Eliminar</button>
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
  display: flex;
  flex-direction: column;
  gap: 16px;
  &-title {
    font-size: 1.5rem;
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
}
</style>