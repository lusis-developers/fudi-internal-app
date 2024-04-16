<script setup lang="ts">
import { onMounted, reactive, watch, watchEffect } from 'vue';
import CrushTextField from '@nabux-crush/crush-text-field'
import CrushSelect from "@nabux-crush/crush-select";

import { bankRules } from '@/utils/Validations';
import { TypeAccounts } from '@/enums';
import { useRoute } from 'vue-router';
import useBusinessStore from '@/store/businessStore';
import type { Bank } from '@/typings/Business';

const route = useRoute()

const emit = defineEmits(['update:bank'])

const businessStore = useBusinessStore()

const bank: Bank = reactive({
  bankName: '',
  accountType: '',
  accountNumber: '',
  accountName: '',
  identification: '',
  email: '',
  phoneNumber: '',
});
const selectOptions = Object.values(TypeAccounts)

function updateAccountType(value: string) {
  if (Object.values(TypeAccounts).includes(value as any)) {
    bank.accountType = value;
    console.log("Tipo de cuenta actualizado: ", bank.accountType);
  }
}
function updateBankName(newVal: string) {
  bank.bankName = newVal;
}
function updateAccountNumber(newVal: string) {
  bank.accountNumber = newVal
}
function updateAccountName (newVal: string) {
  bank.accountName = newVal
}
function updateAccountIdentification(newVal: string) {
  bank.identification = newVal
}
function updateBankEmail (newVal: string) {
  bank.email = newVal
}
function updatePhoneNumber(newVal: string) {
  bank.phoneNumber = newVal
}

watch(() => bank, (newBank, oldBank) => {
  console.log('El objeto bank antiguo:', oldBank);
  console.log('El objeto bank nuevo:', newBank);
  console.log('banco que esta emitiendose', bank)
  emit('update:bank', bank)
}, { deep: true });


onMounted(async () => {
  const id = route.params.id;
  const response = businessStore.getBusinessById(id as any);
  if (response) {
    Object.assign(bank, response.bank);
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
      v-model:value="bank.bankName"
      label="Nombre del banco"
      :valid-rules="bankRules.bankNameValidation"
      @update:modelValue="updateBankName"/>
    <CrushSelect
      label="Tipo de cuenta"
      :options="selectOptions"
      :value="bank.accountType"
      @update:value="updateAccountType" />
    <CrushTextField
      v-model:value="bank.accountNumber"
      label="Número de cuenta"
      :valid-rules="bankRules.accountNumberValidation"
      @update:modelValue="updateAccountNumber"/>
    <CrushTextField
      v-model:value="bank.accountName"
      label="Titular de la cuenta"
      @update:modelValue="updateAccountName"/>
    <CrushTextField
      v-model:value="bank.identification"
      label="Identificación"
      :valid-rules="bankRules.accountNumberValidation"
      @update:modelValue="updateAccountIdentification"/>
    <CrushTextField
      v-model:value="bank.email"
      label="Email"
      :valid-rules="bankRules.emailValidation"
      @update:modelValue="updateBankEmail"/>
    <CrushTextField
      v-model:value="bank.phoneNumber"
      label="Número de teléfono"
      :valid-rules="bankRules.accountNumberValidation"
      @update:modelValue="updatePhoneNumber"/>
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