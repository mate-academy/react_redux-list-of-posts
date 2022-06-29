import { RootState } from '../react-app-env';

export const getPostsSelector = (state: RootState) => state.posts;

export const getUsersSelector = (state: RootState) => state.users;

export const getPostsByUserIdSelector = (userId: number) => {
  const postsByUserIdSelector = (state: RootState) => {
    return state.posts.filter(post => post.userId === userId);
  };

  return postsByUserIdSelector;
};

export const getPostCommentsSelector = (state: RootState) => state.postComments;
