import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';

export const fetchUserPosts = createAsyncThunk(
  'selectedUser/fetchPosts',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);
