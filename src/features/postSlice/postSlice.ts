/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserPosts } from './../../api/posts';
import { Post } from '../../types/Post';

export const loadUserPosts = createAsyncThunk<Post[], number>(
  'posts/loadUserPosts',
  async userId => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

export interface PostState {
  loaded: boolean;
  items: Post[];
  hasError: boolean;
}

const initialState: PostState = {
  loaded: false,
  items: [] as Post[],
  hasError: false,
};

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadUserPosts.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });
    builder.addCase(loadUserPosts.fulfilled, (state, action) => {
      state.loaded = true;
      state.items = action.payload;
    });
    builder.addCase(loadUserPosts.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export const selectPosts = (state: { posts: PostState }) => state.posts.items;
