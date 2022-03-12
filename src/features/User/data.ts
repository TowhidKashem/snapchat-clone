export type User = {
  id: string;
  username: string;
  avatar: string;
  gender: 'male' | 'female' | 'other';
  age: number;
  fullName: string;
};

export type Geolocation = {
  country: string;
  state: string;
  city: string;
  zip: string;
  latitude: number;
  longitude: number;
};
