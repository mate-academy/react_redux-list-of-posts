import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionType } from './action-type.enum';
import { getUserPosts } from '../../api/posts';

const loadUserPosts = createAsyncThunk(
  ActionType.LOAD,
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

export { loadUserPosts };
