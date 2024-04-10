import { defineStore } from 'pinia';

interface Coordinates {
  lat: number;
  lng: number;
  radius: number;
}

interface Item {
  name: string;
  price: string;
  details: string;
}

export interface Business {
  _id?: string;
  name: string;
  botName: string;
  coordinates: Coordinates;
  currency: string;
  location: string;
  schedule: string;
  website: string;
  startDate: string;
  status: string;
  drinks: Item[];
  meals: Item[];
}

interface BusinessState {
  businesses: Business[] | null;
  selectedBusiness: Business | null;
  errorMessage: string | null;
  isLoading: boolean;
}

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
        this.businesses.push(newBusiness);
      } else {
        this.businesses = [newBusiness];
      }
    }
  }
});

export default useBusinessStore;