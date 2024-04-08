import { defineStore } from 'pinia';

interface Business {
  id: number;
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
});

export default useBusinessStore;