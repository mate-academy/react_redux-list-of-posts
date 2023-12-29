/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

export interface PostsState {
  posts: Post[];
  isLoading: boolean;
  error: string;
}

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  error: '',
};

export const init = createAsyncThunk(
  'posts/fetch', (userId: number) => getUserPosts(userId),
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    clearPosts: (state) => {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.isLoading = false;
    });

    builder.addCase(init.rejected, (state) => {
      state.error = 'Something went wrong';
      state.isLoading = false;
    });
  },
});

export const { actions } = postsSlice;
export default postsSlice.reducer;
