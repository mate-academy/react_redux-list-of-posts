import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export const loadUserPosts = createAsyncThunk('posts/fetch', (userId: number) =>
  getUserPosts(userId),
);

type PostsState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadUserPosts.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(loadUserPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });

    builder.addCase(loadUserPosts.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export const { set } = postsSlice.actions;
