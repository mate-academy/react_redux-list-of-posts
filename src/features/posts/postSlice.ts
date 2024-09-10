/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', getUserPosts);

type State = {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: State = {
  posts: [],
  loaded: false,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      state.loaded = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loaded = false;
    });
    builder.addCase(fetchPosts.rejected, state => {
      state.posts = [];
      state.hasError = true;
    });
  },
});

export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;
