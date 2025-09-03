export interface DataState<T> {
  loaded: boolean;
  hasError: boolean;
  items: T[];
  visible?: boolean;
}
