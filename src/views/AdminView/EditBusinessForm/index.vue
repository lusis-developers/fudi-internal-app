<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import CrushButton from '@nabux-crush/crush-button'
import CrushTextField from '@nabux-crush/crush-text-field';

import useBusinessStore from '@/store/businessStore';
import type { Business, Bank } from '@/typings/Business';
import { businesStatus } from '@/enums';
import BankData from '@/views/AdminView/EditBusinessForm/BankData.vue';
import BusinessDishes from '@/views/AdminView/EditBusinessForm/BusinessDishes.vue';
import BusinessInfo from '@/views/AdminView/EditBusinessForm/BusinessInfo.vue';

const route = useRoute();
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
  await businessStore.updateBusiness(business)
}

function closeEdit() {
  emit('close-edit')
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
    <BusinessInfo/>
    <BankData/>
    <BusinessDishes />
   </div>
    <div class="actions-container">
      <CrushButton 
        variant="secondary"
        text="Cancelar"
        @click="closeEdit"/>
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