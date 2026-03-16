import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

export const fetchComments = createAsyncThunk<Comment[], number>(
  'comments/fetch',
  async (userId: number) => {
    const comments = await getPostComments(userId);

    return comments;
  },
);
