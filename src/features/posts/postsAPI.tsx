import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';

export const setPosts = createAsyncThunk('/posts/fetchPosts',
  async (id: number) => {
    const posts = await getUserPosts(id);

    return posts;
  });
