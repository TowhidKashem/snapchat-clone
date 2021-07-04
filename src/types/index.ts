export interface Loadable<T> {
  loading: boolean;
  error: boolean;
  data: T;
}

export interface Object<T> {
  [key: string]: T;
}
