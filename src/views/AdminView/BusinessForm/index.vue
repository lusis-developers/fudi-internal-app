<script setup lang="ts">
import { computed, reactive } from 'vue';
import CrushTextField from '@nabux-crush/crush-text-field'
import CrushTextArea from '@nabux-crush/crush-text-area'
import CrushButton from '@nabux-crush/crush-button'
import CrushSelect from '@nabux-crush/crush-select'

import CalendarInput from '@/components/Global/Calendar.vue'
import useBusinessStore from '@/store/businessStore'
import BankData from '@/views/AdminView/BusinessForm/BankData.vue'
import BusinessData from './BusinessData.vue';
import { businesStatus } from '@/enums';
import { useRouter } from 'vue-router';

const router = useRouter();

const businessStore = useBusinessStore()

const business = reactive({
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
  meals: []
});

const sendForm = computed(() => {
  return business.name !== '' &&
    business.website !== '' &&
    business.startDate !== '' &&
    businessRules.nameValidation.every((rule) => rule.validate(business.name)) &&
    businessRules.instagramValidation.every((rule) => rule.validate(business.website));
});

const businessRules = {
  nameValidation: [
    {
      validate: (value: string) => value.length >= 2,
      message: 'El nombre debe tener al menos 2 caracteres'
    },
  ],
  instagramValidation: [
    {
      validate: (value: string) => value.length >= 2,
      message: 'Instagram debe tener al menos 2 caracteres'
    },
  ],
};

const selectOptions = Object.values(businesStatus)

function updateStatus (value: string) {
  if (Object.values(businesStatus).includes(value as any)) {
    business.status = value as any
    console.log('valor acutalizado: ', business.status)
  }
}
function handleDate(value: string) {
  const date = new Date(value);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();

  business.startDate = `${day}/${month}/${year}`;
  console.log('fecha de inicio: ', business.startDate)
}
function submitBusiness() {
  if (sendForm.value) {
    businessStore.saveBusiness(business);
    router.push('/admin')
  }
}
</script>

<template>
  <div class="container">
   <form class="form">
    <CrushTextField
      v-model="business.name"
      :label="'Nombre'"
      :valid-rules="businessRules.nameValidation"/>
    <CrushTextField
      v-model="business.website"
      :label="'Instagram'"
      :valid-rules="businessRules.instagramValidation"/>
    <CalendarInput
      label="Fecha de inicio"
      class="calendar-input"
      :value="business.startDate"
      @input="handleDate"
    />
    <CrushSelect
      label="Status"
      :options="selectOptions"
      :value="business.status"
      @update:value="updateStatus"
    />
    <BankData/>
    <BusinessData/>
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