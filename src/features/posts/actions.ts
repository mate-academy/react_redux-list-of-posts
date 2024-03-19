import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';

export enum ActionTypes {
  LOAD = 'posts/load',
}

const loadUserPosts = createAsyncThunk(
  ActionTypes.LOAD,
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

export { loadUserPosts };
