import { AnyAction } from 'redux';

const SET_POSTS = 'SET_POSTS';
const DELETE_POST = 'DELETE_POST';
const DELETE_COMMENT = 'DELETE_COMMENT';

export const setPosts = (posts: []) => ({ type: SET_POSTS, posts });

export const deletePost = (postId: number) => ({
  type: DELETE_POST,
  postId,
});

export const deleteComment = (postId: number, commentId: number) => ({
  type: DELETE_COMMENT,
  postId,
  commentId,
});

const postsReducer = (posts: Post[] = [], action: AnyAction) => {
  switch (action.type) {
    case SET_POSTS:
      return action.posts;
    case DELETE_COMMENT:
      return posts.map(post => (
        post.id === action.postId
          ? {
            ...post,
            comments: post.comments
              .filter(comment => comment.id !== action.commentId),
          } : post));
    case DELETE_POST:
      return posts.filter(post => post.id !== action.postId);
    default:
      return posts;
  }
};

export default postsReducer;
