export type Filter = 'dog' | 'bees' | 'halloween' | 'deform' | 'tmp' | '';

export type SetPhoto = (dataURL: string) => void;

export type Photos = Array<{
  month: string;
  year: number;
  images: string[];
}>;
