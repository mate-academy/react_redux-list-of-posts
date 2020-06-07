import { AnyAction } from 'redux';
import { SUCCESSFUL_LOADING, REMOVE_POST } from './actionTypes';

export const handleSuccessfulLoad = (data: Post) => ({ type: SUCCESSFUL_LOADING, posts: data });
export const removePost = (postId: number) => ({ type: REMOVE_POST, postId });

const reducer = (posts = [], action: AnyAction) => {
  switch (action.type) {
    case SUCCESSFUL_LOADING:
      return action.posts;
    case REMOVE_POST:
      return posts.filter((post: Post) => post.id !== action.postId);
    case 'COMMENT':
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
