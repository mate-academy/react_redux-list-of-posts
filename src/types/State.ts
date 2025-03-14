export type State<T> = {
  loaded: boolean;
  hasError: boolean;
  items: T[];
};
