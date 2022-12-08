import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getPosts } from '../api/posts';

type PostsState = {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const init = createAsyncThunk('posts/fetch', () => {
  return getPosts();
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: (state) => {
      return { ...state, posts: [] };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.fulfilled, (state, action) => {
      return { ...state, posts: action.payload, loaded: true };
    });

    builder.addCase(init.rejected, (state) => {
      return { ...state, loaded: true, hasError: true };
    });
  },
});

export default postsSlice.reducer;
export const { actions } = postsSlice;
