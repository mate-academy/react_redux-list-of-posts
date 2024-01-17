import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';
import { Comment } from '../../types/Comment';
import { commentsActions } from './commentsSlice';

const loadComments = createAsyncThunk('comments/fetch', (postId: number) => {
  return getPostComments(postId);
});

const addComment = createAsyncThunk('comments/add',
  async (comment: Omit<Comment, 'id'>) => {
    try {
      const newComment = await createComment(comment);

      return newComment;
    } catch {
      throw new Error('Failed to add comment');
    }
  });

const removeComment = createAsyncThunk('comments/remove',
  async (commentId: number, { dispatch }) => {
    try {
      dispatch(commentsActions.localeRemoveComment(commentId));

      return deleteComment(commentId);
    } catch {
      throw new Error();
    }
  });

export const thunks = { addComment, loadComments, removeComment };
