import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPostComments, createComment } from '../../api/comments';
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
