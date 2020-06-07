import { AnyAction } from 'redux';
import { REMOVE_POST, SET_POSTS, REMOVE_COMMENT } from './actionTypes';

export const setPosts = (data: Post) => ({ type: SET_POSTS, posts: data });
export const removePost = (postId: number) => ({ type: REMOVE_POST, postId });
export const removeCommentFromPost = (commentId: number) => ({ type: REMOVE_COMMENT, commentId });

const reducer = (posts = [], action: AnyAction) => {
  switch (action.type) {
    case SET_POSTS:
      return action.posts;
    case REMOVE_POST:
      return posts.filter((post: Post) => post.id !== action.postId);
    case REMOVE_COMMENT:
      return posts.map((post: Post) => {
        return {
          ...post,
          comments: post.comments.filter((comment: Comment) => comment.id !== action.commentId),
        };
      });
    default:
      return posts;
  }
};

export default reducer;
