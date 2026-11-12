import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPostComments } from '../../../api/comments';

export const loadPostComments = createAsyncThunk(
  'postComments/fetch',
  async (postId: number) => {
    return getPostComments(postId);
  },
);
