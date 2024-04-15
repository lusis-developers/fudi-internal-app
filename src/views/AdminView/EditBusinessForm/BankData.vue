<script setup lang="ts">
import { computed, onMounted, reactive, watchEffect } from 'vue';
import CrushTextField from '@nabux-crush/crush-text-field'
import CrushSelect from "@nabux-crush/crush-select";

import { bankRules } from '@/utils/Validations';
import { TypeAccounts } from '@/enums';
import { useRoute } from 'vue-router';
import useBusinessStore from '@/store/businessStore';

const route = useRoute()

const businessStore = useBusinessStore()

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
const selectOptions = Object.values(TypeAccounts)

function updateAccountType(value: string) {
  if (Object.values(TypeAccounts).includes(value as any)) {
    bank.accountType = value;
    console.log("Tipo de cuenta actualizado: ", bank.accountType);
  }
}

watchEffect(() => {
  if (sendForm.value) {
    emit('update:bankData', bank);
  }
});

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
      :valid-rules="bankRules.bankNameValidation"/>
    <CrushSelect
      label="Tipo de cuenta"
      :options="selectOptions"
      :value="bank.accountType"
      @update:value="updateAccountType" />
    <CrushTextField
      v-model:value="bank.accountNumber"
      label="Número de cuenta"
      :valid-rules="bankRules.accountNumberValidation"/>
    <CrushTextField
      v-model:value="bank.accountName"
      label="Titular de la cuenta"/>
    <CrushTextField
      v-model:value="bank.identification"
      label="Identificación"
      :valid-rules="bankRules.accountNumberValidation"/>
    <CrushTextField
      v-model:value="bank.email"
      label="Email"
      :valid-rules="bankRules.emailValidation"/>
    <CrushTextField
      v-model:value="bank.phoneNumber"
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