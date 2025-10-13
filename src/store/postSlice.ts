/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadUserPosts = createAsyncThunk(
  'posts/loadUserPosts',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      state.items = [];
      state.hasError = false;
      state.loaded = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadUserPosts.pending, state => {
      state.hasError = false;
      state.loaded = true;
    });
    builder.addCase(
      loadUserPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.loaded = false;
        state.items = action.payload;
      },
    );
    builder.addCase(loadUserPosts.rejected, state => {
      state.hasError = true;
      state.loaded = false;
    });
  },
});

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
