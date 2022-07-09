import { RootState } from '../react-app-env';

export const getUsersSelector = (state: RootState) => state.users;
export const getPostsSelector = (state: RootState) => state.posts;
export const getCommentsSelector = (state: RootState) => state.comments;
export const getCurrentUserSelector = (
  state: RootState,
) => state.selectedUserId;
export const getSelectedPostIdSelector = (
  state: RootState,
) => state.selectedPostId;
export const getIsLoadingSelector = (state: RootState) => state.isLoading;
export const getPostTitleSelector = (state: RootState) => state.posttitle;
export const getAllPostsSelector = (state: RootState) => state.posts;
