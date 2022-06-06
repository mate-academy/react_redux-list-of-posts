import { RootState } from './index';

// Selectors - a function receiving Redux state and returning some data from it
export const isLoading = (state: RootState) => state.loading;
export const getMessage = (state: RootState) => state.message;
export const getUserId = (state: RootState) => state.userId;
export const getPostId = (state: RootState) => state.postId;
export const getPosts = (state: RootState) => state.posts;
export const getDisplayedPosts = (state: RootState) => state.displayedPosts;
export const getComments = (state: RootState) => state.comments;
export const getPost = (state: RootState) => state.post;
export const getCommentsVisibility
  = (state: RootState) => state.commentsVisibility;
