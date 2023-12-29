import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';

export const getUserPostsThunk = createAsyncThunk(
  'posts/getUserPosts', async (userId: number) => {
    return getUserPosts(userId);
  },
);
