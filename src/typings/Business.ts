export interface Coordinates {
  lat: number;
  lng: number;
  radius: number;
}

export interface Item {
  name: string;
  price: string;
  details?: string;
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

export interface BusinessState {
  businesses: Business[] | null;
  selectedBusiness: Business | null;
  errorMessage: string | null;
  isLoading: boolean;
}