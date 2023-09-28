import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';

export const fetchPosts = createAsyncThunk(
  'posts/fetch',
  async (userId: number, thunkAPI) => {
    try {
      const data = await getUserPosts(userId);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  },
);
