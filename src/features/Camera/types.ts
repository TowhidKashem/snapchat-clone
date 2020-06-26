export type Filter = 'dog' | 'bees' | 'halloween' | 'deform' | 'liberty' | '';

export type SetPhoto = (dataURL: string) => void;

export type Photos = Array<{
  month: string;
  year: number;
  images: string[];
}>;

type FilterFunction = {
  init: (callback: () => void) => void;
};

export type FilterObj = {
  bees: FilterFunction;
  deform: FilterFunction;
  dog: FilterFunction;
  halloween: FilterFunction;
};
