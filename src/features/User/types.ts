export interface User {
  id: string;
  username: string;
  avatar: string;
  gender: 'male' | 'female' | 'other';
  age: number;
  fullName: string;
}

export interface Geolocation {
  country: string;
  state: string;
  city: string;
  zip: string;
  latitude: number;
  longitude: number;
}
