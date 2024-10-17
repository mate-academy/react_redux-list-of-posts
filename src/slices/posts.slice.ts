/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type Posts = {
  loaded: boolean;
  hasError: boolean;
  items: Post[];
};

const initialState: Posts = {
  loaded: false,
  hasError: false,
  items: [],
};

export const fetchPosts = createAsyncThunk<Post[], number>(
  'posts/fetchPosts',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    resetPost: state => {
      state.items = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      state.loaded = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loaded = false;
      state.items = action.payload;
    });
    builder.addCase(fetchPosts.rejected, state => {
      state.loaded = false;
      state.hasError = true;
    });
  },
});

export const { resetPost } = postsSlice.actions;
export default postsSlice.reducer;
