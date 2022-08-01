import { State } from '../react-app-env';

export const getUsersSelector = (state: State) => state.users;
export const getPostsSelector = (state: State) => state.posts;
export const getSelectedUserId = (state: State) => state.selectedUserId;
export const getSelectedPostId = (state: State) => state.selectedPostId;
export const getComments = (state: State) => state.postComments;

export const getUserPosts = (userId: number) => {
  return (state: State) => {
    return state.posts.filter(post => post.userId === userId);
  };
};

export const getPost = (postId: number) => {
  return (state: State) => {
    return state.posts.find(post => post.id === postId);
  };
};
