import { State } from '../react-app-env';

export const getPostsSelector = (state: State) => state.posts;
export const getUsersSelector = (state: State) => state.users;
export const getSelectedUserIdSelector = (state: State) => state.selectedUserId;
export const getSelectedPostIdSelector = (state: State) => state.selectedPostId;
export const getSelectedPostCommentsSelector
  = (state: State) => state.selectedPostComments;
