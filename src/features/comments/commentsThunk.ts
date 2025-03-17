import { Dispatch } from '@reduxjs/toolkit';
import { fetchCommentsFailed } from './commentsThunk';
import {
  getPostComments,
  createComment,
  deleteComment,
} from '../../api/comments';
import { fetchCommentsStart } from './commentsThunk';
import { fetchCommentsSuccess } from './commentsThunk';
import { CommentData } from '../../types/Comment';
import {
  addCommentSuccess,
  deleteCommentSuccess,
} from '../comments/commentsSlice';

export {
  fetchCommentsStart,
  fetchCommentsSuccess,
  fetchCommentsFailed,
} from '../comments/commentsSlice';

export const fetchComments = (postId: number) => async (dispatch: Dispatch) => {
  try {
    dispatch(fetchCommentsStart());
    const response = await getPostComments(postId);

    dispatch(fetchCommentsSuccess(response));
  } catch (error) {
    if (error instanceof Error) {
      dispatch(fetchCommentsFailed(error.message));
    } else {
      dispatch(fetchCommentsFailed('unable to fetch comments'));
    }
  }
};

export const addComments =
  ({ name, email, body }: CommentData, postId: number) =>
  async (dispatch: Dispatch) => {
    try {
      const response = await createComment({ name, email, body, postId });

      dispatch(addCommentSuccess(response));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(fetchCommentsFailed(error.message));
      } else {
        dispatch(fetchCommentsFailed('unable to add comment'));
      }
    }
  };

export const deleteComments =
  (commentId: number) => async (dispatch: Dispatch) => {
    try {
      await deleteComment(commentId);
      dispatch(deleteCommentSuccess(commentId));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(fetchCommentsFailed(error.message));
      } else {
        dispatch(fetchCommentsFailed('unable to delete comment'));
      }
    }
  };
