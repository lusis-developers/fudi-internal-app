<script setup lang="ts">
import { computed, reactive } from 'vue';
import CrushTextField from '@nabux-crush/crush-text-field'
import CrushTextArea from '@nabux-crush/crush-text-area'
import CrushButton from '@nabux-crush/crush-button'
import CrushSelect from '@nabux-crush/crush-select'

import CalendarInput from '@/components/Global/Calendar.vue'
import { businesStatus } from '@/enums';

const business = reactive({
  name: '',
  instagram: '',
  startDate: '',
  status: businesStatus.PENDING,
  details: '',
});
const sendForm = computed(() => {
  return business.name !== '' &&
    business.instagram !== '' &&
    business.startDate !== '' &&
    business.status !== businesStatus.INACTIVE &&
    businessRules.nameValidation.every((rule) => rule.validate(business.name)) &&
    businessRules.instagramValidation.every((rule) => rule.validate(business.instagram));
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
function handleInput(value: string) {
  business.startDate = value;
  console.log('fecha de inicio: ', business.startDate)
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
      v-model="business.instagram"
      :label="'Instagram'"
      :valid-rules="businessRules.instagramValidation"/>
    <CalendarInput
      label="Fecha de inicio"
      class="calendar-input"
      :value="business.startDate"
      @input="handleInput"
    />
    <CrushSelect
      label="Status"
      :options="selectOptions"
      :value="business.status"
      @update:value="updateStatus"
    />
    <CrushButton
      variant="'primary'"
      text="Guardar"
      class="form-button"
      :disabled="!sendForm"/>
   </form> 
  </div>
</template>

<style lang="scss" scoped>
.form {
  width: 80%;
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