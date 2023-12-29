import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';

export const getPostCommnetsThunk = createAsyncThunk(
  'comments/getPostComments', async (postId: number) => {
    return getPostComments(postId);
  },
);
