import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserPosts } from './posts';

export const loadUserPosts = createAsyncThunk(
  'posts/fetch',
  (userId: number) => getUserPosts(userId),
);
