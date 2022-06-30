import { State } from '../react-app-env';

export const getPostsSelector = (state: State) => state.posts;

export const getUserIdSelector = (state: State) => state.currentUserId;

export const getAllUsersSelector = (state: State) => state.allUsers;

export const getCommentsSelector = (state: State) => state.commentsList;

export const getPostIdSelector = (state: State) => state.selectedPostId;

export const getSinglePostSelector = (state: State) => state.selectedPost;

export const getNeedToUpdate = (state: State) => state.needToUpdate;
