import { createAsyncThunk } from '@reduxjs/toolkit';
import * as postApi from '../../api/posts';

export const fetchPosts = createAsyncThunk(
  'posts/fetch', (userId: number) => {
    return postApi.getUserPosts(userId);
  },
);
