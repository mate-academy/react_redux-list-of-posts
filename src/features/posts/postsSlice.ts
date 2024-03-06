import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';
/* eslint-disable no-param-reassign */

type PostsState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  items: [],
  loaded: true,
  hasError: false,
};

export const loadedUserPosts = createAsyncThunk('posts/fetch', (id: number) => {
  return getUserPosts(id);
});

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    removePosts: state => {
      state.items = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(loadedUserPosts.pending, state => {
      state.loaded = false;
    });
    builder.addCase(loadedUserPosts.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
    builder.addCase(loadedUserPosts.fulfilled, (state, action) => {
      state.loaded = true;
      state.items = action.payload;
    });
  },
});

export const { removePosts } = postSlice.actions;
export default postSlice.reducer;
