export type GetSnaps = (lat: number, lon: number) => void;

export interface Weather {
  city: string;
  temperature: string;
  icon: string;
}
