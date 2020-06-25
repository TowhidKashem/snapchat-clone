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

export type SetLatLon = (lat: number, lon: number) => void;

export type GetGeoLocation = () => [
  boolean,
  {
    latitude: string;
    longitude: string;
  }
];

export interface Session {
  id: number;
  username: string;
  avatar: string;
  gender: 'male' | 'female' | 'other';
  age: number;
  fullName: string;
}
