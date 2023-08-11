import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getPostComments,
  createComment,
  deleteComment,
} from '../../api/comments';
import { Comment } from '../../types/Comment';

export const loadComments = createAsyncThunk(
  'comments/load',
  (userId: number) => {
    return getPostComments(userId);
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  (data: Omit<Comment, 'id'>) => {
    return createComment(data);
  },
);

export const removeComment = createAsyncThunk(
  'comments/remove',
  (commentId: number) => {
    return deleteComment(commentId);
  },
);
