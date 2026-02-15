/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from './postsAPI';

type PostsState = {
  loaded: boolean;
  items: Post[];
  hasError: boolean;
};

const initialState: PostsState = {
  loaded: false,
  items: [],
  hasError: false,
};

export const init = createAsyncThunk('post/fetch', (value: number) =>
  getUserPosts(value),
);

const PostsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    handlePosts: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loaded = state.loaded && false;
      state.hasError = state.hasError && false;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });

    builder.addCase(init.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export default PostsSlice.reducer;
export const { handlePosts } = PostsSlice.actions;
