import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';

// export const getUserPosts = (userId: number) => {
//   return client.get<Post[]>(`/posts?userId=${userId}`);
// };

export const getUserPosts = createAsyncThunk(
  'fetchPosts',
  async (userId: number) => client.get<Post[]>(`/posts?userId=${userId}`),
);

export const getPosts = createAsyncThunk('fetchPosts', async () => {
  return client.get<Post[]>(`/posts`);
});
