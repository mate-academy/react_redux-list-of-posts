/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export interface UsersState {
  posts: Post[];
  loading: boolean;
  error: string;
}

const initialState: UsersState = {
  posts: [] as Post[],
  loading: false,
  error: '',
};

export const uploadPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (id: number) => {
    const value = await getUserPosts(id);

    return value;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(uploadPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(uploadPosts.rejected, (state) => {
        state.error = 'Error';
      });
  },
});

export default postsSlice.reducer;
