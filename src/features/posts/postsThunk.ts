import { createAsyncThunk } from '@reduxjs/toolkit';

import { getUserPosts } from '../../api/posts';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',

  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);
