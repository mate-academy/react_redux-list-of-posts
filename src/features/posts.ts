import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadPosts = createAsyncThunk(
  'posts/fetch',
  async (userId: number) => {
    const result = await getUserPosts(userId);

    return result;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      return { ...state, posts: [] };
    },
  },
  extraReducers: builder => {
    builder.addCase(loadPosts.pending, state => {
      return { ...state, loaded: false };
    });

    builder.addCase(loadPosts.fulfilled, (state, actions) => {
      return { ...state, items: actions.payload };
    });

    builder.addCase(loadPosts.rejected, state => {
      return { ...state, hasError: true };
    });

    builder.addMatcher(loadPosts.settled, state => {
      return { ...state, loaded: true };
    });
  },
});

export const postsReducer = postsSlice.reducer;
