import { createAsyncThunk } from '@reduxjs/toolkit';
import * as postsApi from '../../api/posts';

export const fetchPosts = createAsyncThunk(
  'posts/fetch', (userId: number) => {
    return postsApi.getUserPosts(userId);
  },
);
