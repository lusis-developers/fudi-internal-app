export interface Coordinates {
  lat: number;
  lng: number;
  radius: number;
}

export interface Item {
  name: string;
  price: string;
  description: string;
}
export interface Bank {
  bankName: string;
  accountType: string;
  accountNumber: string;
  accountName: string;
  identification: string;
  email: string;
  phoneNumber: string;
}

export interface Business {
  _id?: string;
  name: string;
  botName: string;
  logo: string
  coordinates: Coordinates;
  currency: string;
  location: string;
  schedule: string;
  website: string;
  startDate: string;
  status: string;
  drinks: Item[];
  meals: Item[];
  bank: Bank;
}

export interface BusinessState {
  businesses: Business[] | null;
  selectedBusiness: Business | null;
  errorMessage: string | null;
  isLoading: boolean;
}