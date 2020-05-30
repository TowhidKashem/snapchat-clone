export interface User {
  id: string;
  username: string;
  avatar: string;
  gender: 'male' | 'female' | 'other';
  age: number;
  fullName: string;
}

export type GetUsers = () => void;
