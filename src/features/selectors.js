import { createSelector } from '@reduxjs/toolkit';

// Existing selectors
export const selectAuthor = createSelector(
  state => state.author,
  authorState => authorState.author,
);

export const selectPosts = createSelector(
  state => state.posts,
  postsState => postsState.posts,
);

export const selectLoading = createSelector(
  state => state.posts,
  postsState => postsState.loading,
);

export const selectError = createSelector(
  state => state.posts,
  postsState => postsState.error,
);

export const selectSelectedPost = createSelector(
  state => state.selectedPost,
  selectedPostState => selectedPostState.selectedPost,
);

export const selectIsLoading = createSelector(
  state => state.comments,
  commentsState => commentsState.isLoading,
);
