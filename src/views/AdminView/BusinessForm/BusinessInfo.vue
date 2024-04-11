<script setup lang="ts">
import CalendarInput from "@/components/Global/Calendar.vue";
import CrushTextField from "@nabux-crush/crush-text-field";
import { computed, reactive, watchEffect } from "vue";
import CrushSelect from "@nabux-crush/crush-select";

import { businesStatus } from "@/enums";
import { businessRules } from "@/utils/Validations";

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

watchEffect(() => {
  if (
    business.name !== "" &&
    business.botName !== "" &&
    business.website !== "" &&
    business.startDate !== "" &&
    business.coordinates.lat !== 0 &&
    business.coordinates.lng !== 0 &&
    business.coordinates.radius !== 0 &&
    business.schedule !== ""
  ) {
    emit("update:business-data", business);
  }
});
</script>

<template>
	<form class="form">
    <CrushTextField
		v-model="business.name"
		:label="'Nombre'"
		:valid-rules="businessRules.nameValidation" />
  <CrushTextField
    v-model="business.botName"
    label="Nombre del Bot"
    :valid-rules="businessRules.nameValidation"/>
	<CrushTextField
		v-model="business.website"
		:label="'Instagram'"
		:valid-rules="businessRules.instagramValidation" />
	<CrushTextField
		v-model="latString"
		label="Latitud del negocio"
		:valid-rules="businessRules.latValidation" />
	<CrushTextField
		v-model="lngString"
		label="Longitud del negocio"
		:valid-rules="businessRules.lngValidation" />
	<CrushTextField
		v-model="radiusString"
		label="Radio de alcance de los pedidos"
		:valid-rules="businessRules.radiusValidation" />
	<CalendarInput
		label="Fecha de inicio del bot"
		class="calendar-input"
		:value="business.startDate"
		@input="handleDate" />
  <CrushTextField
    v-model="business.schedule"
    label="Escribe el horario en el que se encuentra abierto el restaurante"
    hint="Ejemplo: 2pm - 6pm"
    :valid-rules="businessRules.scheduleValidation" />
	<CrushSelect
		label="Status"
		:options="selectOptions"
		:value="business.status"
		@update:value="updateStatus" />
  </form>
</template>

<style lang="scss" scoped>
.form {
  width: 100%;
  :deep(.hint) {
    color: $black;
    font-family: $primary-font;
    font-weight: bold;
  }
}
</style>