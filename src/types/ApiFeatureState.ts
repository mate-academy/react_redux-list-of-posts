export type ApiFeatureState<I> = {
  loaded: boolean;
  hasError: boolean;
  items: I;
};
