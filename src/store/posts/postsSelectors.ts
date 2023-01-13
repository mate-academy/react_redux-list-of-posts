import { RootState } from '../store';

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPostsLoaded = (state: RootState) => state.posts.loaded;
export const selectPostsError = (state: RootState) => state.posts.error;
export const selectCurrentPost
  = (state: RootState) => state.posts.currentPost;
