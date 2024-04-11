import APIRestaurants from '@/services/Restaurants/Restaurants';
import type { Business, BusinessState } from '@/typings/Business';
import { defineStore } from 'pinia';

const restaurantService = new APIRestaurants()

export const useBusinessStore = defineStore('businessStore', {
  state: (): BusinessState => ({
    businesses: null,
    selectedBusiness: null,
    errorMessage: null,
    isLoading: false
  }),
  actions: {
    async fetchBusiness() {
      this.isLoading = true;
      try {
        const response = await restaurantService.getAllRestaurants();
        console.log('Respuesta de la petición:', response); 
        this.businesses = response;
        console.log('negocios', this.businesses)
      } catch (error: any) {
        console.error('error: ', error);
        if (error instanceof Error) {
          this.errorMessage = error.message;
        }
      } finally {
        this.isLoading = false;
      }
    },
    
    saveBusiness(newBusiness: Business) {
      const randomId = Math.floor(Math.random() * 10000).toString(); 
      newBusiness._id = randomId;
      if (this.businesses) {
        console.log('nuevo negocio')
        this.businesses.push(newBusiness);
      } else {
        this.businesses = [newBusiness];
      }
    }
  }
});

export default useBusinessStore;