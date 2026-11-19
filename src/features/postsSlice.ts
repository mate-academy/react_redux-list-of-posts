import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

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

export const fetchUserPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  (userId: number) => getUserPosts(userId),
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: () => ({
      items: [],
      loaded: false,
      hasError: false,
    }),
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserPosts.pending, state => ({
        ...state,
        loaded: false,
        hasError: false,
      }))
      .addCase(fetchUserPosts.fulfilled, (state, action) => ({
        ...state,
        items: action.payload,
        loaded: true,
      }))
      .addCase(fetchUserPosts.rejected, state => ({
        ...state,
        hasError: true,
        loaded: true,
      }));
  },
});

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
