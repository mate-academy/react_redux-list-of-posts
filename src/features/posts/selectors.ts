import { RootState } from '../../app/store';

export const selectPostsState = (state: RootState) => {
  const { items, hasError, loaded } = state.posts;

  return { items, hasError, loaded };
};

export const selectSelectedPost = (
  state: RootState,
) => state.posts.selectedPost;
