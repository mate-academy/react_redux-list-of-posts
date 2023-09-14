/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { loadPostsByUserID } from './postsAPI';

type PostsState = {
  posts: Post[],
  isLoading: boolean,
  error: string,
};

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  error: '',
};

export const init = createAsyncThunk('posts/fetch', (id: number) => {
  return loadPostsByUserID(id);
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(init.pending, (state) => {
      state.isLoading = true;
    });

    build.addCase(init.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.isLoading = false;
    });

    build.addCase(init.rejected, (state) => {
      state.error = 'Some error occured when loading posts';
    });
  },
});

export const postsReducer = postsSlice.reducer;
