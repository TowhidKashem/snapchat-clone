export interface Loadable<T> {
  loading: boolean;
  error: boolean;
  data: T;
}
