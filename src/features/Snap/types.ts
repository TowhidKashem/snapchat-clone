export interface Snap {
  location: string;
  lat: number;
  lon: number;
  time: number;
  type: 'video' | 'photo';
  url: string;
  userId: string;
}

export type OpenSnap = (snap: Snap) => void;
