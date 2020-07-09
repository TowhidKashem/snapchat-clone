export interface Snap {
  type: 'video' | 'photo';
  url: string;
  location?: string;
  lat?: number;
  lon?: number;
  time?: number;
  caption?: string;
  shareable?: boolean;
}

export type AddSnap = (snap: Snap) => void;
