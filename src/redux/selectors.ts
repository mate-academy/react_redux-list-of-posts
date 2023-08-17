import { RootState } from './store';

export const selectAuthor = (state: RootState) => state.author.data;
export const selectComments = (state: RootState) => state.comments;
export const selectPosts = (state: RootState) => state.posts;
export const selectSelectedPost = (state: RootState) => state.selectedPost.data;
export const selectUsers = (state: RootState) => state.users;
