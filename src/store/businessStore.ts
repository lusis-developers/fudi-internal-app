import { defineStore } from 'pinia';

export interface Business {
  id?: number;
  name: string;
  instagram: string;
  startDate: string;
  status: string;
  details: string;
}

interface BusinessState {
  businesses: Business[] | null;
  selectedBusiness: Business | null;
  errorMessage: string | null;
  isLoading: boolean;
}

export const useBusinessStore = defineStore('businessStore', {
  state: (): BusinessState => ({
    businesses: [
      {
        id: 2632,
        name: 'Brooklyn Zoe',
        instagram: 'chopchops',
        startDate: 'hoy',
        status: 'Pending',
        details: 'ver'
      },
    ],
    selectedBusiness: null,
    errorMessage: null,
    isLoading: false
  }),
  actions: {
    saveBusiness(newBusiness: Business) {
      const randomId = Math.floor(Math.random() * 10000); 
      newBusiness.id = randomId;
      this.businesses?.push(newBusiness);
    }
  }
});

export default useBusinessStore;