import { State } from '../react-app-env';

export const getPostsSelector = (state: State) => state.posts;
export const getPostSelector = (state: State) => state.post;
export const getPostIdSelector = (state: State) => state.postId;
export const getUserSelector = (state: State) => state.users;
export const getUserIdSelector = (state: State) => state.userId;
export const getCommentsSelector = (state: State) => state.comments;
