/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

const initialState: { items: Post[]; loaded: boolean; hasError: string } = {
  items: [],
  loaded: false,
  hasError: '',
};

export const loadUserPosts = createAsyncThunk(
  `posts/fetch`,
  async (userId: number) => {
    return getUserPosts(userId) as Promise<Post[]>;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Post[]>) {
      state.items = action.payload;
    },

    clearPosts(state) {
      state.items = [];
    },
  },

  extraReducers(builder) {
    builder.addCase(loadUserPosts.pending, state => {
      state.loaded = false;
    });

    builder.addCase(loadUserPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });

    builder.addCase(loadUserPosts.rejected, state => {
      state.hasError = 'Something went wrong!';
      state.loaded = true;
    });
  },
});

export const { setPosts, clearPosts } = postsSlice.actions;

export default postsSlice.reducer;
