export interface Snap {
  location: string;
  time: number;
  type: 'video' | 'photo';
  file: string;
}

export type OpenSnaps = (snaps: Snap[]) => void;
