import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';

export const postsThunk = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});
