import { createAsyncThunk } from '@reduxjs/toolkit';
import * as commentsApi from '../api/posts';

export const postsFetch = createAsyncThunk(
  'posts/fetch',
  (userId: number) => {
    return commentsApi.getUserPosts(userId);
  },
);
