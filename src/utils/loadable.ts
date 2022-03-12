export type Loadable<T> = {
  loading: boolean;
  error: boolean;
  data: T;
};

export const loadable = {
  loading: false,
  error: false,
  data: []
};
