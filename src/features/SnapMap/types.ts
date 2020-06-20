export type GetSnaps = (lat: number, lon: number) => void;

export type GetWeather = (lat: number, lon: number) => void;

export interface Weather {
  temperature: number;
  condition: string;
}
