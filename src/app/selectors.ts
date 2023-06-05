import { RootState } from './RootState';

export const postsFromServer = (state: RootState) => state.posts;
export const postComments = (state: RootState) => state.postComments;
export const usersFromServer = (state: RootState) => state.users;
export const authorFromReducer = (state: RootState) => state.author;
export const selectedPost = (state: RootState) => state.currentPost.initial;
