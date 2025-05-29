/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

export interface PostsState {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const fetchByAuthor = createAsyncThunk(
  'posts/fetchPostsByAuthor',
  async (authorId: number) => {
    return getUserPosts(authorId);
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear(state) {
      state.posts = [];
      state.loaded = false;
      state.hasError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchByAuthor.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchByAuthor.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loaded = true;
      })
      .addCase(fetchByAuthor.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const { clear } = postsSlice.actions;

export default postsSlice.reducer;
