import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

export const fetchPost = createAsyncThunk<Post[], number>(
  'posts/fetchByUser',
  async userId => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);
