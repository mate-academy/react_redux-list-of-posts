import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPostComments } from '../../api/comments';

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number, thunkAPI) => {
    try {
      const data = await getPostComments(postId);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  },
);
