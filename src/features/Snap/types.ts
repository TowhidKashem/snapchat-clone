export interface Snap {
  type: 'video' | 'photo';
  url: string;
  location?: string;
  lat?: number;
  lon?: number;
  time?: number;
  caption?: string;
}

export type OpenSnap = (snap: Snap) => void;
