/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/post';

const initialState = {
  isLoading: false,
  errorMessage: '',
  posts: [] as Post[],
};

export const loadPosts = createAsyncThunk(
  'posts/load',
  (userId: number) => getUserPosts(userId),
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loadPosts.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(loadPosts.rejected, (state) => {
      state.isLoading = false;
      state.errorMessage = 'Unable to load posts';
    });

    builder.addCase(loadPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errorMessage = '';
      state.posts = action.payload;
    });
  },
});

export const postsReducer = postsSlice.reducer;
export const { setPosts, setErrorMessage, setIsLoading } = postsSlice.actions;
