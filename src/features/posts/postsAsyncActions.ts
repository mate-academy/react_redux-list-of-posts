import { createAsyncThunk } from '@reduxjs/toolkit';

import { getUserPosts } from '../../api/posts';

export const loadPosts = createAsyncThunk(
  'posts/fetch',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);
