import { AnyAction } from 'redux';

// Action types
const SET_POSTS = 'SET_POSTS';
const DELETE_POST = 'DELETE_POST';
const DELETE_COMMENT = 'DELETE_COMMENT';

// Action creators
export const setPosts = (posts: Post[]) => ({ type: SET_POSTS, posts });
export const deletePost = (idx: number) => ({ type: DELETE_POST, idx });
export const deleteCommentItem = (postId: number, commentId: number) => ({
  type: DELETE_COMMENT, postId, commentId,
});

// message reducer receives only the `state.message` part, but not the entire Redux state
const postReducer = (posts: Post[] = [], action: AnyAction) => {
  switch (action.type) {
    case SET_POSTS:
      return action.posts;
    case DELETE_POST:
      return [...posts].filter(post => post.id !== action.idx);
    case DELETE_COMMENT:
      return [...posts].map(post => (
        (post.id === action.postId) ? {
          ...post,
          commentList: post.commentList!.filter(comment => comment.id !== action.commentId),
        } : post
      ));

    default:
      return posts;
  }
};

export default postReducer;
