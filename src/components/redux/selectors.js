import { createSelector } from 'reselect';

const rootSelector = state => state;

export const selectList = createSelector(
  rootSelector,
  ({ preparedPosts }) => preparedPosts
);

export const selectFilter = createSelector(
  rootSelector,
  ({ filter }) => filter
)

export const selectListError = createSelector(
  rootSelector,
  ({ error }) => error
);

export const selectIsLoading = createSelector(
  rootSelector,
  ({ isLoading }) => isLoading
);
