/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

export const loadPosts = createAsyncThunk(
  'posts/load',
  (userId: number) => getUserPosts(userId),
);

const initialState = {
  isLoading: false,
  errorMessage: '',
  posts: [] as Post[],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(loadPosts.rejected, (state) => {
        state.isLoading = false;
        state.errorMessage = 'An error occured';
      });
  },
});

export default postsSlice.reducer;
export const { setIsLoading, setErrorMessage, setPosts } = postsSlice.actions;
