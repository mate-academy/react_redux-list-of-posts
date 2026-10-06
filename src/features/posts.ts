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

export const loadUserPosts = createAsyncThunk('posts/fetch', (userId: number) =>
  getUserPosts(userId),
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: state => ({
      ...state,
      items: [],
    }),
  },
  extraReducers: builder => {
    builder
      .addCase(loadUserPosts.pending, state => ({
        ...state,
        loaded: false,
        hasError: false,
      }))
      .addCase(loadUserPosts.fulfilled, (state, action) => ({
        ...state,
        items: action.payload,
        loaded: true,
      }))
      .addCase(loadUserPosts.rejected, state => ({
        ...state,
        hasError: true,
        loaded: true,
      }));
  },
});

export const { actions } = postsSlice;
export default postsSlice.reducer;
