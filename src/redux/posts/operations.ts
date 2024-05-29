import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';

export const getUsersPosts = createAsyncThunk(
  'posts/getUsersPosts',
  getUserPosts,
);
