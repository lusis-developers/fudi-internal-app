import { defineStore } from 'pinia';

interface UserState {
  password: string | null,
  errorMessage: string | null,
  isLoading: boolean,
}

export const useUserStore = defineStore('UserStore', {
  state: (): UserState => ({
    password: null,
    errorMessage: null,
    isLoading: false,
  }),

  actions: {
    login(password: string): void {
      this.isLoading = true;
      try {
        if (password === "soydenissita") {
          console.log("¡Acceso concedido!");
          this.password = password;
        } else {
          console.log("Acceso denegado");
          this.errorMessage = 'Contraseña incorrecta';
        }
      } finally {
        this.isLoading = false;
      }
    },
  }
});

export default useUserStore;