import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export type PostsState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  items: [],
  loaded: true,
  hasError: false,
};

export const fetchPostsAsync = createAsyncThunk(
  'posts/getPosts',
  async (userId: number) => {
    const arr = await getUserPosts(userId);

    return arr;
  },
);

export const PostsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      return {
        ...state,
        items: [],
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPostsAsync.pending, state => {
        return {
          ...state,
          loaded: false,
        };
      })
      .addCase(fetchPostsAsync.fulfilled, (state, action) => {
        return {
          ...state,
          items: action.payload,
          loaded: true,
        };
      })
      .addCase(fetchPostsAsync.rejected, state => {
        return {
          ...state,
          hasError: true,
          loaded: true,
        };
      });
  },
});

export const { clearPosts } = PostsSlice.actions;
export default PostsSlice.reducer;
