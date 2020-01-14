import { SET_POSTS, DELETE_COMMENT, DELETE_POST } from '../constants';

export const setPosts = posts => ({
  type: SET_POSTS,
  payload: posts,
});

export const deletePost = postId => ({
  type: DELETE_POST,
  payload: postId,
});

export const deleteComment = (postId, commentId) => ({
  type: DELETE_COMMENT,
  postId,
  commentId,
});

const postsReducer = (posts = [], action) => {
  switch (action.type) {
    case SET_POSTS:
      return action.payload;

    case DELETE_POST:
      return posts.filter(post => post.id !== action.payload);

    case DELETE_COMMENT:
      return posts.map(post => (post.id === action.postId
        ? {
          ...post,
          comments: post.comments
            .filter(comment => comment.id !== action.commentId),
        }
        : post));

    default:
      return posts;
  }
};

export default postsReducer;
