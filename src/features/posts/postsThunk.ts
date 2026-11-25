import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

export const initPosts = createAsyncThunk(
  'posts/init',
  async (userId: number): Promise<Post[]> => {
    return getUserPosts(userId);
  },
);
