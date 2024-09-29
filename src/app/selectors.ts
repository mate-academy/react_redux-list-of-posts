import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

const createTypedSelector = createSelector.withTypes<RootState>();

export const selectUsers = createTypedSelector(
  [state => state.users],
  users => users,
);

export const selectPosts = createTypedSelector(
  [state => state.posts],
  posts => posts,
);

export const selectComments = createTypedSelector(
  [state => state.comments],
  comments => comments,
);
