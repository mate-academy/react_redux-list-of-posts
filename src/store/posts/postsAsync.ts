import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';

export const fetchPosts = createAsyncThunk('posts/Fetch posts',
  async (id: number) => {
    return getUserPosts(id);
  });
