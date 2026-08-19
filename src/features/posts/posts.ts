import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetch',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => ({
        ...state,
        loaded: false,
        hasError: false,
      }))
      .addCase(fetchPosts.fulfilled, (state, action) => ({
        ...state,
        loaded: true,
        items: action.payload,
      }))
      .addCase(fetchPosts.rejected, state => ({
        ...state,
        loaded: true,
        hasError: true,
      }));
  },
});

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;