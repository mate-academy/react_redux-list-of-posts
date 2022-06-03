import { State } from '..';

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

export const getPostsSelector = (state: State) => {
  return state.PostsReducer.posts;
};

export const getIsPostListLoadingSelector = (state: State) => {
  return state.PostsReducer.isPostListLoading;
};

export const getPostsTitleQuerySelector = (state: State) => {
  return state.PostsReducer.titleQuery;
};

export const getVisiblePostsSelector = (state: State) => {
  return state.PostsReducer.visiblePosts;
};

export const getPostsDeleteTargets = (state: State) => {
  return state.PostsReducer.postsDeleteTargets;
};
