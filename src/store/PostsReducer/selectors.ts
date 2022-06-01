import { State } from '..';

export const getUserSelector = (state: State) => {
  return state.PostsReducer.user;
};

export const getSelectedPostIdSelector = (state: State) => {
  return state.PostsReducer.selectedPostId;
};

export const getSelectValueSelector = (state: State) => {
  return state.PostsReducer.selectValue;
};

export const getSelectedPostSelector = (state: State) => {
  return state.PostsReducer.selectedPost;
};

export const getIsPostLoadingSelector = (state: State) => {
  return state.PostsReducer.isPostLoading;
};
