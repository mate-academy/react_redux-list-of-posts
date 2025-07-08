/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { getUserPosts } from '../api/posts';

const initialState = {
  loading: false,
  error: '',
  posts: [] as Post[],
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (id: User['id']) => {
    const value = await getUserPosts(id);

    return value;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      fetchPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.posts = action.payload;
      },
    );
    builder.addCase(fetchPosts.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong!';
    });
  },
});

export const selectPosts = (state: RootState) => state.posts.posts;

export default postsSlice.reducer;
