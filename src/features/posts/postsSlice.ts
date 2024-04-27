/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';
// eslint-disable-next-line import/no-cycle

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

export const loadPostsAsync = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: state => {
      state.posts = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadPostsAsync.pending, state => {
        state.loaded = true;
      })
      .addCase(loadPostsAsync.fulfilled, (state, action) => {
        state.loaded = false;
        state.posts = action.payload;
      })
      .addCase(loadPostsAsync.rejected, state => {
        state.loaded = false;
        state.hasError = true;
      });
  },
});

export const postsState = (state: RootState) => state.posts;
export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;
