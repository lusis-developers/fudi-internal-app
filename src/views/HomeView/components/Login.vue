<script setup lang="ts">
import useUserStore from "@/store/userStore";
import { ref } from "vue";
import { useRouter } from "vue-router";

const password = ref("");
const userStore = useUserStore();
const router = useRouter();

function  handleSubmit () {
  userStore.login(password.value);
  if (userStore.password === "soydenissita") {
    router.push({ name: 'admin' });
  }
};
</script>

<template>
	<div class="container">
		<h2 class="title">Login para denissita</h2>
		<form @submit.prevent="handleSubmit" class="form">
			<input
				type="password"
				v-model="password"
				placeholder="Contraseña"
				required
				class="form-password"
			/>
			<button type="submit" class="form-button">Ingresar</button>
		</form>
	</div>
</template>

<style lang="scss" scoped>
.container {
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  .title {
    text-align: center;
  }
  .form {
    width: 80%;
    max-width: 768px;
    background-color: $pink;
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 8px;
    .form-password {
      margin-bottom: 1rem;
      padding: 0.5rem;
      font-size: 1rem;
      border-radius: 4px;
      border: 1px solid #ccc;
      outline: none;
    }
    .form-button {
      padding: 0.5rem 1rem;
      font-size: 1rem;
      color: #fff;
      background-color: $purple;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      &:hover {
        background-color: darken($purple, 10%);
      }
    }
  }
}
</style>