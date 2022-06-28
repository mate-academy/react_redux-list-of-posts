import { State } from '../react-app-env';

export const getPostsSelector = (state: State) => state.posts;
export const getUsersSelector = (state: State) => state.users;

export const getCurrentPostIdSelector = (state: State) => state.currentPostId;

export const getCurrentPostSelector = (state: State) => state.currentPost;
export const getCommentsSelector = (state: State) => state.comments;
