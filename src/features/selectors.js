import { createSelector } from '@reduxjs/toolkit';

// Select the author from the state
export const selectAuthor = createSelector(
  state => state.author,
  authorState => authorState.author,
);

// Select the posts from the state
export const selectPosts = createSelector(
  state => state.posts,
  postsState => postsState.posts,
);

// Select the loading state from the posts slice
export const selectLoading = createSelector(
  state => state.posts,
  postsState => postsState.loading,
);

// Select the error state from the posts slice
export const selectError = createSelector(
  state => state.posts,
  postsState => postsState.error,
);

// Select the currently selected post
export const selectSelectedPost = createSelector(
  state => state.selectedPost,
  selectedPostState => selectedPostState.selectedPost,
);
