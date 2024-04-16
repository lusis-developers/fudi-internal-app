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
        this.businesses = response;
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
    },
    removeDrinkFromBusiness(businessId: string, drinkName: string) {
      const business = this.businesses?.find(business => business._id === businessId);
      if (business && business.drinks) {
        const drinkIndex = business.drinks.findIndex(drink => drink.name === drinkName);
        if (drinkIndex !== -1) {
          business.drinks.splice(drinkIndex, 1);
          console.log('drinks en store', business.drinks)
        }
      }
    },
    async updateBusiness(updatedBusiness: Business) {
      try {
        const response = await restaurantService.editRestaurant(updatedBusiness)
        console.log('response en edit', response)
        if (this.businesses) {
          const index = this.businesses.findIndex(business => business._id === updatedBusiness._id)
          if (index !== -1) {
            this.businesses[index] = response
          }
        }
      } catch (error) {
        console.error('error updating restaurant: ', error)
        if (error instanceof Error) {
          this.errorMessage = error.message;
        }
      }
    }
  }
});

export default useBusinessStore;