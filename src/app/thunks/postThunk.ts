import { createAsyncThunk } from '@reduxjs/toolkit';
import * as postAPI from '../../api/posts';

export const fetchUserPosts = createAsyncThunk(
  'posts/fetch',
  (userId: number) => {
    return postAPI.getUserPosts(userId);
  },
);
