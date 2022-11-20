/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

export interface PostsState {
  loaded: boolean;
  items: Post[];
  hasError: boolean;
}

const initialState: PostsState = {
  loaded: false,
  items: [],
  hasError: false,
};

export const getUserPostsFromServer = createAsyncThunk(
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
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserPostsFromServer.pending, state => {
        state.loaded = false;
      })
      .addCase(getUserPostsFromServer.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(getUserPostsFromServer.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export const { actions } = postsSlice;

export default postsSlice.reducer;
