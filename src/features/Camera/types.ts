export type Filter = 'dog' | 'bees' | 'halloween' | 'deform' | 'liberty' | '';

export type Photos = Array<{
  month: string;
  year: number;
  images: string[];
}>;

type FilterFunction = {
  init: (callback: () => void) => void;
};

export type FilterScript = {
  bees: FilterFunction;
  deform: FilterFunction;
  dog: FilterFunction;
  halloween: FilterFunction;
};

export type CameraMode = 'user' | 'environment';
