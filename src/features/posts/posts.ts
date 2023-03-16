/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

export const getPostsAsync = createAsyncThunk('posts/fetch', (id: number) => {
  return getUserPosts(id);
});

export interface PostState {
  posts: Post[],
  currentPost: Post | null,
  loaded: boolean,
  error: boolean,
}

const initialState: PostState = {
  posts: [],
  currentPost: null,
  loaded: false,
  error: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setCurrentPost: (state, action) => {
      state.currentPost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPostsAsync.pending, (state) => {
      state.loaded = false;
    });
    builder.addCase(getPostsAsync.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loaded = true;
    });
    builder.addCase(getPostsAsync.rejected, (state) => {
      state.loaded = true;
      state.error = true;
    });
  },
});

export default postsSlice.reducer;
export const { actions } = postsSlice;
