/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

export const fetchPosts
= createAsyncThunk('posts/fetch', async (user: number) => {
  const response = await getUserPosts(user);

  return response;
});

export interface InitialStorePosts {
  value: Post[];
  isLoading: boolean;
  error: boolean;
}

const initialState: InitialStorePosts = {
  value: [],
  isLoading: false,
  error: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Post[]>) => {
      state.error = false;
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.value = action.payload;
      state.isLoading = false;
    });

    builder.addCase(fetchPosts.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export default postsSlice.reducer;
