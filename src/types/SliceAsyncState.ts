export type SliceAsyncState<T> = {
  loaded: boolean;
  hasError: boolean;
  items: T;
};
