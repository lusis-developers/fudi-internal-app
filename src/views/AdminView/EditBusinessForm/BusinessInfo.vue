<script setup lang="ts">
import CalendarInput from "@/components/Global/Calendar.vue";
import CrushTextField from "@nabux-crush/crush-text-field";
import { computed, onMounted, reactive, watch } from "vue";
import CrushSelect from "@nabux-crush/crush-select";
import { businesStatus } from "@/enums";
import { businessRules } from "@/utils/Validations";
import { useRoute } from "vue-router";
import useBusinessStore from "@/store/businessStore";

const emit = defineEmits(["update:business-data"]);

const route = useRoute()
const businessStore = useBusinessStore()

const business = reactive({
  name: "",
  website: "",
  startDate: "",
  status: businesStatus.PENDING,
  botName: "",
  logo: "",
  currency: "USD",
  location: "",
  schedule: "",
  coordinates: {
    lat: 0,
    lng: 0,
    radius: 0,
  },
});

const updateName = createUpdateFunction('name');
const updateWebsite = createUpdateFunction('website');
const updateStartDate = createUpdateFunction('startDate');
const updateBotName = createUpdateFunction('botName');
const updateSchedule = createUpdateFunction('schedule');
const updateLngString = (newVal: string) => {
  business.coordinates.lng = parseFloat(newVal);
};
const updateLatString = (newVal: string) => {
  business.coordinates.lat = parseFloat(newVal);
};
const updateRadiusString = (newVal: string) => {
  business.coordinates.radius = parseFloat(newVal);
};

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

function createUpdateFunction(field: keyof typeof business ) {
  return (newVal: any) => {
    business[field] = newVal;
  };
}
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
async function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const formData = new FormData();
    formData.append('data', target.files[0]);

    const oldImage = business.logo.split('/').pop();
    console.log('Imagen antigua:', oldImage);

    try {
      if (oldImage) {
        await fetch(import.meta.env.VITE_ENDPOINT_DELETE_IMAGE, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ oldImage })
        });
        console.log('Imagen antigua eliminada:', oldImage);
      }

      const response = await fetch(import.meta.env.VITE_ENDPOINT_POST_LOGO, {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        const selfLink = jsonResponse[0].selfLink;
        business.logo = selfLink;
        console.log('Imagen subida exitosamente:', selfLink);
      }
    } catch (error) {
      console.error('Error al enviar la solicitud', error);
    }
  }
}

watch(() => business, (newBusiness, oldBusiness) => {
  console.log('El objeto businessInfo antiguo:', oldBusiness);
  console.log('El objeto businessInfo nuevo:', newBusiness);
  console.log('banco que esta emitiendose', business)
  emit('update:business-data', business)
}, { deep: true });

onMounted(async () => {
  const $inputDisable = document.querySelector('.crush-text-field-input')
  $inputDisable?.setAttribute('disabled', 'true');
  $inputDisable?.setAttribute('style', 'cursor: not-allowed;')
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
      :valid-rules="businessRules.nameValidation" 
      @update:modelValue="updateName"/>
    <CrushTextField
      v-model:value="business.botName"
      label="Nombre del Bot"
      :valid-rules="businessRules.nameValidation"
      @update:modelValue="updateBotName"/>
    <input type="file" @change="handleFileUpload" accept="image/*" />
    <CrushTextField
      v-model:value="business.website"
      :label="'Instagram'"
      :valid-rules="businessRules.instagramValidation" 
      @update:modelValue="updateWebsite"/>
    <CrushTextField
      v-model:value="latString"
      label="Latitud del negocio"
      :valid-rules="businessRules.latValidation" 
      @update:modelValue="updateLatString"/>
    <CrushTextField
      v-model:value="lngString"
      label="Longitud del negocio"
      :valid-rules="businessRules.lngValidation" 
      @update:modelValue="updateLngString"/>
    <CrushTextField
      v-model:value="radiusString"
      label="Radio de alcance de los pedidos"
      :valid-rules="businessRules.radiusValidation" 
      @update:modelValue="updateRadiusString"/>
    <CalendarInput
      label="Fecha de inicio del bot"
      class="calendar-input"
      :value="business.startDate"
      @input="handleDate" 
      @update:modelValue="updateStartDate"/>
    <CrushTextField
      v-model:value="business.schedule"
      label="Escribe el horario en el que se encuentra abierto el restaurante"
      hint="Ejemplo: 2pm - 6pm"
      :valid-rules="businessRules.scheduleValidation" 
      @update:modelValue="updateSchedule"/>
    <CrushSelect
      label="Status"
      :options="selectOptions"
      :value="business.status"
      @update:value="updateStatus" />
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