import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPostComments } from '../../api/comments';

export const fetchPostComments = createAsyncThunk(
  'selectedPost/fetchComments',
  async (postId: number) => {
    return getPostComments(postId);
  },
);
