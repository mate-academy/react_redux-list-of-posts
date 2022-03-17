import { Dispatch } from 'react';
import { BASE_URL } from '../../helpers/api';
import { PostCommentsAction, PostCommentsTypes } from '../types/postComments';

export const fetchPostsComments = (selectedPostId: number) => {
  return async (dispatch: Dispatch<PostCommentsAction>) => {
    try {
      dispatch({ type: PostCommentsTypes.FETCH_POST_COMMENTS });

      const response = await fetch(`${BASE_URL}/comments?postId=${selectedPostId}`);

      const postsCommentsFromServer = response.json();

      dispatch({
        type: PostCommentsTypes.FETCH_POST_COMMENTS_SUCCESS,
        payload: await postsCommentsFromServer,
      });
    } catch (error) {
      dispatch({
        type: PostCommentsTypes.FETCH_POST_COMMENTS_ERROR,
        payload: 'An error occurred while loading comments. Please contact our support.',
      });
    }
  };
};
