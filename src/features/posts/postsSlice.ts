import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

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

export const loadUserPosts = createAsyncThunk(
  'posts/load',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(loadUserPosts.pending, () => ({
        loaded: false,
        hasError: false,
        items: [],
      }))
      .addCase(loadUserPosts.fulfilled, (_state, action) => ({
        loaded: true,
        hasError: false,
        items: action.payload,
      }))
      .addCase(loadUserPosts.rejected, () => ({
        loaded: true,
        hasError: true,
        items: [],
      }));
  },
});

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
