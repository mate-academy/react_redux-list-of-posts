import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

type PostsState = {
  loaded: boolean;
  hasError: boolean;
  items: Post[];
};

const initialState: PostsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const loadPosts = createAsyncThunk('posts/load', getUserPosts);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(loadPosts.pending, state => ({
        ...state,
        loaded: false,
        hasError: false,
      }))
      .addCase(loadPosts.fulfilled, (state, action) => ({
        ...state,
        loaded: true,
        items: action.payload,
      }))
      .addCase(loadPosts.rejected, state => ({
        ...state,
        loaded: true,
        hasError: true,
      }));
  },
});

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
