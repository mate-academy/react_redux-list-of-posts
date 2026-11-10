import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPosts } from '../../api/posts';

export const loadPosts = createAsyncThunk('posts/fetch', async () => {
  return getPosts();
});
