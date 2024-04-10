<script setup lang="ts">
import { computed, reactive, watchEffect } from 'vue';
import CrushTextField from '@nabux-crush/crush-text-field'

const emit = defineEmits(['update:bankData'])

const bank = reactive({
  bankName: '',
  accountType: '',
  accountNumber: '',
  accountName: '',
  identification: '',
  email: '',
  phoneNumber: '',
});
const sendForm = computed(() => {
  return Object.values(bank).every(value => value !== '');
});

const bankRules = {
  bankNameValidation: [
    {
      validate: (value: string) => value.length >= 2,
      message: 'El nombre del banco debe tener al menos 2 caracteres'
    },
  ],
  accountTypeValidation: [
    {
      validate: (value: string) => value.length >= 2,
      message: 'El tipo de cuenta debe tener al menos 2 caracteres'
    },
  ],
  accountNumberValidation: [
    {
      validate: (value: string) => /^\d+$/.test(value),
      message: 'El número de cuenta solo debe contener números'
    },
  ],
  emailValidation: [
    {
      validate: (value: string) => /^\S+@\S+\.\S+$/.test(value),
      message: 'Por favor, introduzca un correo electrónico válido'
    },
  ],
};

watchEffect(() => {
  if (sendForm.value) {
    emit('update:bankData', bank);
  }
});
</script>

<template>
  <div class="container">
    <p class="container-title">
      Ahora los datos del banco de dicho negocio
    </p>
   <form class="form">
    <CrushTextField
      v-model="bank.bankName"
      label="Nombre del banco"
      :valid-rules="bankRules.bankNameValidation"/>
    <CrushTextField
      v-model="bank.accountType"
      label="Tipo de cuenta"
      :valid-rules="bankRules.accountTypeValidation"/>
    <CrushTextField
      v-model="bank.accountNumber"
      label="Número de cuenta"
      :valid-rules="bankRules.accountNumberValidation"/>
    <CrushTextField
      v-model="bank.accountName"
      label="Nombre de la cuenta"/>
    <CrushTextField
      v-model="bank.identification"
      label="Identificación"
      :valid-rules="bankRules.accountNumberValidation"/>
    <CrushTextField
      v-model="bank.email"
      label="Email"
      :valid-rules="bankRules.emailValidation"/>
    <CrushTextField
      v-model="bank.phoneNumber"
      label="Número de teléfono"
      :valid-rules="bankRules.accountNumberValidation"/>
   </form> 
  </div>
</template>

<style lang="scss" scoped>
.container-title {
  font-size: 1.5rem;
  text-align: center;
  padding: 24px 0;
  color: $pink;
}
.form {
  width: 100%;
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
  &-button {
    width: 50%;
    max-width: 200px;
  }
}
</style>