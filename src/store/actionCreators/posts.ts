import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';

export const fetchPosts = createAsyncThunk(
  'posts/fetchAll',
  async (id: number) => {
    const posts = await getUserPosts(id);

    return posts;
  },
);
