import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export const selectPostsState = (state: RootState) => state.posts;

export const selectPosts = createSelector(
  selectPostsState,
  postsState => postsState.posts,
);
export const selectPostsLoaded = createSelector(
  selectPostsState,
  postsState => postsState.loaded,
);
export const selectPostsHasError = createSelector(
  selectPostsState,
  postsState => postsState.hasError,
);

export const selectAuthor = (state: RootState) => state.author.author;

export const selectSelectedPost = (state: RootState) =>
  state.selectedPost.selectedPost;

export const selectUsersState = (state: RootState) => state.users;

export const selectUsers = createSelector(
  selectUsersState,
  usersState => usersState.users,
);
