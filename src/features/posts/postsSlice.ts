import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

export const fetchPosts = createAsyncThunk('posts/fetch', (userId: number) =>
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
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      state.loaded = true;
      state.hasError = false;
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = false;
    });

    builder.addCase(fetchPosts.rejected, state => {
      state.loaded = false;
      state.hasError = true;
    });
  },
});

export const postsReducer = postsSlice.reducer;
