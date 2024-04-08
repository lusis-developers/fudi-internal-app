<script setup lang="ts">
import CrushTextField from '@nabux-crush/crush-text-area'
import { ref } from 'vue';

const input = ref('')
</script>

<template>
  <div class="container">
   <form>
    <CrushTextField
      v-model="input"
      :label="'hola'"/>
   </form> 
  </div>
</template>