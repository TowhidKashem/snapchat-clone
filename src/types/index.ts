export interface Weather {
  city: string;
  temperature: string;
  icon: string;
}

export interface User {
  id: string;
  username: string;
  avatar: string;
  gender: string;
  age: number;
  fullName: string;
}

export interface Drawer {
  component: string;
  animationIn?: string;
  animationOut?: string;
  animationInDuration?: number;
  animationOutDuration?: number;
  theme?: 'light' | 'dark';
}
