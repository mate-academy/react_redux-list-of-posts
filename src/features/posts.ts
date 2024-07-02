import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export const changeAsync = createAsyncThunk(
  'posts/fetchPost',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

type PostsState = {
  loaded: boolean;
  hasError: boolean;
  items: Post[];
};

const initialState: PostsState = {
  loaded: true,
  hasError: false,
  items: [],
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(changeAsync.pending, state => ({ ...state, loaded: false }))
      .addCase(changeAsync.fulfilled, (state, action) => ({
        ...state,
        loaded: true,
        items: action.payload,
      }))
      .addCase(changeAsync.rejected, state => ({
        ...state,
        hasError: true,
        loaded: true,
      }));
  },
});

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
