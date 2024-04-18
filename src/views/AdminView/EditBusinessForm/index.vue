<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import CrushButton from '@nabux-crush/crush-button'

import { businesStatus, Category } from '@/enums';
import type { Business, Bank } from '@/typings/Business';
import useBusinessStore from '@/store/businessStore';
import BankData from '@/views/AdminView/EditBusinessForm/BankData.vue';
import BusinessDishes from '@/views/AdminView/EditBusinessForm/BusinessDishes.vue';
import BusinessInfo from '@/views/AdminView/EditBusinessForm/BusinessInfo.vue';

const emit = defineEmits(['close-edit']);

const route = useRoute();
const businessStore = useBusinessStore();

const business = reactive<Business>({
  name: '',
  botName: '',
  coordinates: {
    lat: 0,
    lng: 0,
    radius: 0
  },
  currency: 'USD',
  location: '',
  schedule: '',
  website: '',
  startDate: '',
  status: businesStatus.PENDING,
  drinks: [],
  meals: [],
  bank: {
    bankName: '',
    accountType: '',
    accountNumber: '',
    accountName: '',
    identification: '',
    email: '',
    phoneNumber: '',
  } as Bank,
});

async function updateBusiness () {
  console.log('business actualizado: ', business)
  await businessStore.updateBusiness(business)
  window.location.assign('/admin');
}
function handleBusinessData(updatedData: Business) {
  console.log('data negocio actaulizada', updatedData)
  Object.assign(business, updatedData);
}
function handleBankData(updatedBankData: Bank) {
  console.log('updated bank data: ', updatedBankData)
  Object.assign(business.bank, updatedBankData);
}
function handleItems(updatedItems: any) {
  console.log('upadated items', updatedItems)
  business.drinks = updatedItems.filter((item: any) => item.category === Category.DRINKS);
  business.meals = updatedItems.filter((item: any) => item.category === Category.MEALS);
}
function cancelEditing() {
  window.location.assign('/admin');
}

onMounted(async () => {
  const id = route.params.id;
  const response = businessStore.getBusinessById(id as any);
  if (response) {
    Object.assign(business, response);
  }
});
</script>

<template>
  <div class="container">
   <div class="form">
    <BusinessInfo @update:business-data="handleBusinessData"/>
    <BankData @update:bank="handleBankData"/>
    <BusinessDishes 
      @update:items="handleItems"
      @update:editing="updateBusiness"
      @update:cancel-editing="cancelEditing"/>
   </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding-bottom: 24px;
}
.form {
  width: 80%;
  max-width: 640px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
  :deep(.crush-text-field-label-text) {
    color: $black;
    font-family: $primary-font;
  }
  :deep(.crush-text-field .input-container .crush-text-field-input) {
    color: $black;
    font-family: $primary-font;
    font-size: 1rem;
  }
  :deep(.crush-text-field .input-container.active) {
    border: 1px solid $purple;
  }
  :deep(.crush-textarea-label-text) {
    color: $black;
    font-family: $primary-font;
    font-weight: bold;
  }
  :deep(.crush-textarea-container .textarea) {
    color: $black;
    font-family: $primary-font;
    font-size: 1rem;
  }
  :deep(.crush-textarea-container.is-focused) {
    border: 1px solid $purple;
  }
  :deep(.form-container-label) {
    color: $black;
    font-family: $primary-font;
    font-weight: bold;
  }
  :deep(.form-container-label-select) {
    border: 1px solid $purple;
    color: $black;
    font-family: $primary-font;
    font-size: 1rem;
  }
  :deep(.crush-button) {
  border: none;
  color: #fff;
  background-color: $pink;
  padding: 8px 16px;
  margin-top: 16px;
  transition: background-color 0.5s ease-in;
  &:hover {
    background-color: darken($pink, 10%);
  }
  }
}
</style>