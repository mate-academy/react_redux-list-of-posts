import { State } from '../react-app-env';

export const getPostsSelector = (state: State) => state.posts;
export const getCommentsSelector = (state: State) => state.comments;
export const getSelectedPostSelector = (state: State) => state.selectedPost;

export const getVisiblePosts = (selectedUserId: number) => {
  return (state: State) => state.posts.filter(post => {
    if (!selectedUserId) {
      return post;
    }

    return post.userId === selectedUserId;
  });
};
