/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

type State = {
  posts: Post[],
  hasError: boolean,
  loaded: boolean,
};

const postsState: State = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const loadPosts = createAsyncThunk('load/posts', getUserPosts);

const postsSlice = createSlice({
  name: 'posts',
  initialState: postsState as State,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loadPosts.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(
      loadPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.posts = action.payload;
        state.loaded = true;
      },
    );

    builder.addCase(
      loadPosts.rejected,
      (state) => {
        state.hasError = true;
        state.loaded = true;
      },
    );
  },
});

export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;
