import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';
import { Comment } from '../../types/Comment';

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const addComments = createAsyncThunk(
  'comments/add',
  (data: Omit<Comment, 'id'>) => (createComment(data)),
);

export const deleteComments = createAsyncThunk(
  'comments/delete',
  (commentId: number) => (deleteComment(commentId)),
);
