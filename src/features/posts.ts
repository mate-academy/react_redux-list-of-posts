/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

type PostsState = {
  items: Post[],
  loaded: boolean,
  hasError: boolean,
};

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const initPosts = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(initPosts.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(
      initPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.items = action.payload;
        state.loaded = true;
      },
    );

    builder.addCase(initPosts.rejected, (state) => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export default postsSlice.reducer;
export const { actions } = postsSlice;
