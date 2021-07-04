export type Filter = 'bees' | 'deform' | 'dog' | 'halloween' | 'liberty' | '';

export type Photo = {
  month: string;
  year: number;
  images: string[];
};

type FilterFunction = {
  init: (callback: (errCode: string) => void) => void;
};

export type FilterScript = {
  bees: FilterFunction;
  deform: FilterFunction;
  dog: FilterFunction;
  halloween: FilterFunction;
  liberty: FilterFunction;
};

declare global {
  interface Window {
    JEEFACEFILTERAPI: any;
    Filters: FilterScript;
  }
}

export type CameraMode = 'user' | 'environment';
