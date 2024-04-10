<script setup lang="ts">
import CrushButton from '@nabux-crush/crush-button'
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import BankData from '@/views/AdminView/BusinessForm/BankData.vue'
import useBusinessStore from '@/store/businessStore'
import BusinessDishes from './BusinessDishes.vue';
import { businesStatus, Category } from '@/enums';
import type { Bank, Business } from '@/typings/Business';
import BusinessInfo from './BusinessInfo.vue';

const router = useRouter();

const businessStore = useBusinessStore()

const items = ref<Array<{ category: string; name: string; price: string; }>>([]);
const business = reactive<Business>({
  _id: '',
  name: '',
  botName: '',
  coordinates: {
    lat: 0,
    lng: 0,
    radius: 0
  },
  currency: '',
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
const sendForm = computed(() => {
  return business.name !== '' &&
    business.website !== '' &&
    business.startDate !== '' &&
    business.bank.bankName !== '' &&
    business.bank.accountType !== '' &&
    business.bank.accountNumber !== '' &&
    business.bank.accountName !== '' &&
    business.bank.identification !== '' &&
    business.bank.email !== '' &&
    business.bank.phoneNumber !== '' &&
    isFormValid.value; 
});
const isFormValid = ref(false);


function updateBusinessDishesValidity(isValid: boolean) {
  isFormValid.value = isValid;
}
function handleItems(newItems: Array<{ category: string; name: string; price: string; }>) {
  items.value = newItems;
  console.log('handle itemsss: ', newItems)
}
function handleBank(bankData: Bank) {
  business.bank = bankData
  console.log('bankData', bankData)
}
function handleInfo (info: Business) {
  business.name = info.name;
  business.website = info.website;
  business.startDate = info.startDate;
  business.status = info.status;
  business.coordinates.lat = info.coordinates.lat;
  business.coordinates.lng = info.coordinates.lng;
}
function submitBusiness() {
  if (sendForm.value) {
    business.drinks = items.value
      .filter(item => item.category === Category.DRINKS)
      .map(item => ({ name: item.name, price: item.price }));
    business.meals = items.value
      .filter(item => item.category === Category.MEALS)
      .map(item => ({ name: item.name, price: item.price }));
    
    businessStore.saveBusiness(business);
    console.log('business: ', business)
    router.push('/admin')
  }
}
</script>

<template>
  <div class="container">
   <form class="form">
    <BusinessInfo
      @update:business-data="handleInfo"/>
    <BankData
      @update:bank-data="handleBank" />
    <BusinessDishes 
      @update:is-valid="updateBusinessDishesValidity"
      @update:items="handleItems"/>
    <CrushButton
      variant="'primary'"
      text="Guardar"
      class="form-button"
      :disabled="!sendForm"
      @click.prevent="submitBusiness"/>
   </form> 
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
  gap: 1rem;
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
  &-button {
    width: 50%;
    max-width: 200px;
  }
}
</style>