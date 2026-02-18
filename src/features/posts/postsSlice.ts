/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getPosts } from '../../api/posts';

type PostsState = {
  items: Post[] | [];
  loaded: boolean;
  hasError: boolean;
};

export const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadPosts = createAsyncThunk('posts/load', async () => {
  return getPosts();
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Post[] | []>) {
      state.items = action.payload;
    },
    cleanPosts(state) {
      state.items = [];
    },
    setLoaded(state, action: PayloadAction<boolean>) {
      state.loaded = action.payload;
    },
    setError(state, action: PayloadAction<boolean>) {
      state.hasError = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadPosts.pending, state => {
        state.loaded = false;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(loadPosts.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export default postsSlice.reducer;
export const { setPosts, cleanPosts, setLoaded, setError } = postsSlice.actions;
