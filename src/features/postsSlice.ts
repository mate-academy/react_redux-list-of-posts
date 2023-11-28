/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface PostsState {
  loaded: boolean;
  hasError: boolean;
  posts: Post[];
}

const initialState: PostsState = {
  loaded: false,
  hasError: false,
  posts: [],
};

export const init = createAsyncThunk(
  'posts/fetch',
  async (userId: number) => {
    const postsFromServer = await getUserPosts(userId);

    return postsFromServer;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reset: state => {
      state.posts = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(
      init.pending,
      state => {
        state.hasError = false;
        state.loaded = false;
      },
    );

    builder.addCase(
      init.fulfilled,
      (state, action) => {
        state.posts = action.payload;
        state.loaded = true;
      },
    );

    builder.addCase(
      init.rejected,
      state => {
        state.hasError = true;
        state.loaded = true;
      },
    );
  },
});

export default postsSlice.reducer;
export const { reset } = postsSlice.actions;
