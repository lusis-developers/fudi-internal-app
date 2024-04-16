<script setup lang="ts">
import CalendarInput from "@/components/Global/Calendar.vue";
import CrushTextField from "@nabux-crush/crush-text-field";
import { computed, onMounted, reactive, watchEffect } from "vue";
import CrushSelect from "@nabux-crush/crush-select";
import CrushButton from "@nabux-crush/crush-button"

import { businesStatus } from "@/enums";
import { businessRules } from "@/utils/Validations";
import { useRoute } from "vue-router";
import useBusinessStore from "@/store/businessStore";

const route = useRoute();

const businessStore = useBusinessStore()

const emit = defineEmits(["update:business-data"]);

const business = reactive({
  name: "",
  website: "",
  startDate: "",
  status: businesStatus.PENDING,
  botName: "",
  currency: "USD",
  location: "",
  schedule: "",
  coordinates: {
    lat: 0,
    lng: 0,
    radius: 0,
  },
});
const lngString = computed({
  get: () => business.coordinates.lng.toString(),
  set: (val) => {
    business.coordinates.lng = parseFloat(val);
  },
});
const latString = computed({
  get: () => business.coordinates.lat.toString(),
  set: (val) => {
    business.coordinates.lat = parseFloat(val);
  },
});
const radiusString = computed({
  get: () => business.coordinates.radius.toString(),
  set: (val) => {
    business.coordinates.radius = parseFloat(val);
  },
});
const selectOptions = Object.values(businesStatus);

function handleDate(value: string) {
  const date = new Date(value);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  business.startDate = `${day}/${month}/${year}`;
  console.log("fecha de inicio: ", business.startDate);
}
function updateStatus(value: string) {
  if (Object.values(businesStatus).includes(value as any)) {
    business.status = value as any;
    console.log("valor acutalizado: ", business.status);
  }
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
	<form class="container">
    <CrushTextField
      v-model:value="business.name"
      :label="'Nombre'"
      :valid-rules="businessRules.nameValidation" />
    <CrushTextField
      v-model:value="business.botName"
      label="Nombre del Bot"
      :valid-rules="businessRules.nameValidation"/>
    <CrushTextField
      v-model:value="business.website"
      :label="'Instagram'"
      :valid-rules="businessRules.instagramValidation" />
    <CrushTextField
      v-model:value="latString"
      label="Latitud del negocio"
      :valid-rules="businessRules.latValidation" />
    <CrushTextField
      v-model:value="lngString"
      label="Longitud del negocio"
      :valid-rules="businessRules.lngValidation" />
    <CrushTextField
      v-model:value="radiusString"
      label="Radio de alcance de los pedidos"
      :valid-rules="businessRules.radiusValidation" />
    <CalendarInput
      label="Fecha de inicio del bot"
      class="calendar-input"
      :value="business.startDate"
      @input="handleDate" />
    <CrushTextField
      v-model:value="business.schedule"
      label="Escribe el horario en el que se encuentra abierto el restaurante"
      hint="Ejemplo: 2pm - 6pm"
      :valid-rules="businessRules.scheduleValidation" />
    <CrushSelect
      label="Status"
      :options="selectOptions"
      :value="business.status"
      @update:value="updateStatus" />
    <CrushButton
      text="Actualizar"/>
  </form>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  :deep(.hint) {
    color: $black;
    font-family: $primary-font;
    font-weight: bold;
  }
}
</style>