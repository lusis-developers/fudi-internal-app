<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CrushButton from '@nabux-crush/crush-button'
import CrushTextField from '@nabux-crush/crush-text-field';

import useBusinessStore from '@/store/businessStore';
import type { Business, Bank } from '@/typings/Business';
import { businesStatus, Category } from '@/enums';
import BankData from '@/views/AdminView/EditBusinessForm/BankData.vue';
import BusinessDishes from '@/views/AdminView/EditBusinessForm/BusinessDishes.vue';
import BusinessInfo from '@/views/AdminView/EditBusinessForm/BusinessInfo.vue';

const route = useRoute();
const router = useRouter();
const businessStore = useBusinessStore();
const emit = defineEmits(['close-edit']);

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
  router.push('/admin')
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
    <BusinessDishes @update:items="handleItems"/>
   </div>
    <div class="actions-container">
      <CrushButton 
        variant="secondary"
        text="Cancelar"
        @click="cancelEditing"/>
      <CrushButton
        class="actions-container-second"
        variant="primary"
        text="Actualizar" 
        @click="updateBusiness"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding-bottom: 24px;
  .actions-container {
    width: 100%;
    display: flex;
    gap: 16px;
    justify-content: center;
    align-items: center;
  }
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