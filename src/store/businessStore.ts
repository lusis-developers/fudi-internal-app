import type { Business, BusinessState } from '@/typings/Business';
import { defineStore } from 'pinia';

export const useBusinessStore = defineStore('businessStore', {
  state: (): BusinessState => ({
    businesses: null,
    selectedBusiness: null,
    errorMessage: null,
    isLoading: false
  }),
  actions: {
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