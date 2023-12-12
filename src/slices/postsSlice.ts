import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface PostsState {
  loaded: boolean,
  hasError: boolean,
  items: Post[],
}

const initialState: PostsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const fetchPosts = createAsyncThunk('posts/fetch', (userId:number) => {
  return getUserPosts(userId);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.hasError = false;
      state.loaded = false;
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.hasError = false;
      state.loaded = true;
    });

    builder.addCase(fetchPosts.rejected, (state) => {
      state.hasError = true;
      state.loaded = false;
    });
  },
});

export default postsSlice.reducer;
