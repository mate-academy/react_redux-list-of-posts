export interface SliceAcyncState<T> {
  loaded: boolean;
  hasError: boolean;
  items: T[];
}
