import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';

export const loadUserPosts = createAsyncThunk(
  'userPosts/fetch',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);

export default loadUserPosts;
