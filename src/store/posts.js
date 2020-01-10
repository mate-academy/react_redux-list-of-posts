import { DELETE_COMMENT, DELETE_POST, HANDLE_SUCCESS } from '../actions';

export const getPosts = state => state.posts;
export const getDeletePosts = state => state.posts;
export const getDeleteComment = state => state.posts;

export const postReducer = (posts = [], action) => {
  switch (action.type) {
    case HANDLE_SUCCESS:
      return action.posts;
    case DELETE_POST:
      return posts.filter(post => post.id !== action.id);
    case DELETE_COMMENT:
      return posts.map(post => (
        {
          ...post,
          comments: post.comments.filter(comment => comment.id !== action.id),
        }));
    default:
      return posts;
  }
};
