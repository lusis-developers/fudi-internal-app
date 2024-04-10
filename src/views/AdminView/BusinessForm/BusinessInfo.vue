<script setup lang="ts">
import CalendarInput from '@/components/Global/Calendar.vue'
import CrushTextField from '@nabux-crush/crush-text-field'
import { computed, reactive, watchEffect } from 'vue';
import CrushSelect from '@nabux-crush/crush-select'

import type { Bank, Business } from '@/typings/Business';
import { businesStatus } from '@/enums';

const emit = defineEmits(['update:business-data']);

const business = reactive<Business>({
  name: '',
  website: '',
  startDate: '',
  status: businesStatus.PENDING,
  botName: '',
  currency: '',
  location: '',
  schedule: '',
  coordinates: {
    lat: 0,
    lng: 0,
    radius: 0,
  },
  drinks: [],
  meals: [],
  bank: {} as Bank,
});
const lngString = computed({
  get: () => business.coordinates.lng.toString(),
  set: (val) => { business.coordinates.lng = parseFloat(val); }
});
const latString = computed({
  get: () => business.coordinates.lat.toString(),
  set: (val) => { business.coordinates.lat = parseFloat(val); }
});
const selectOptions = Object.values(businesStatus)

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
  latValidation: [
    {
      validate: (value: string) => {
        const num = parseFloat(value);
        return !isNaN(num) && num >= -90 && num <= 90;
      },
      message: 'La latitud debe estar entre -90 y 90'
    },
  ],
  lngValidation: [
    {
      validate: (value: string) => {
        const num = parseFloat(value);
        return !isNaN(num) && num >= -180 && num <= 180;
      },
      message: 'La longitud debe estar entre -180 y 180'
    },
  ],
};

function handleDate(value: string) {
  const date = new Date(value);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();

  business.startDate = `${day}/${month}/${year}`;
  console.log('fecha de inicio: ', business.startDate)
}
function updateStatus (value: string) {
  if (Object.values(businesStatus).includes(value as any)) {
    business.status = value as any
    console.log('valor acutalizado: ', business.status)
  }
}

watchEffect(() => {
  if (business.name !== '' &&
      business.website !== '' &&
      business.startDate !== '' &&
      business.coordinates.lat !== 0 &&
      business.coordinates.lng !== 0) {
    emit('update:business-data', business);
  }
});
</script>

<template>
  <CrushTextField
      v-model="business.name"
      :label="'Nombre'"
      :valid-rules="businessRules.nameValidation"/>
    <CrushTextField
      v-model="business.website"
      :label="'Instagram'"
      :valid-rules="businessRules.instagramValidation"/>
    <CrushTextField
      v-model="latString"
      label="Latitud del negocio"
      :valid-rules="businessRules.latValidation"/>
    <CrushTextField
      v-model="lngString"
      label="Longitud del negocio"
      :valid-rules="businessRules.lngValidation"/>
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
</template>