import APIRestaurants from '@/services/Restaurants/Restaurants';
import type { Business, BusinessState } from '@/typings/Business';
import { defineStore } from 'pinia';

const restaurantService = new APIRestaurants();

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
        console.log('negocios', this.businesses);
      } catch (error: any) {
        console.error('error: ', error);
        if (error instanceof Error) {
          this.errorMessage = error.message;
        }
      } finally {
        this.isLoading = false;
      }
    },
    async saveBusiness(newBusiness: Business) {
      try {
        const response = await restaurantService.addRestaurant(newBusiness);
        if (this.businesses) {
          this.businesses.push(response.data);
        } else {
          this.businesses = [response.data];
        }
      } catch (error: any) {
        console.error('Error adding restaurant: ', error);
        if (error instanceof Error) {
          this.errorMessage = error.message;
        }
      }
    },
    getBusinessById(id: string) {
      if (this.businesses) {
        return this.businesses.find(business => business._id === id)
      }
      return null
    }
  }
});

export default useBusinessStore;