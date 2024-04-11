import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  data: Post[];
  loading: boolean;
  error: boolean;
};

const initialState: PostsState = {
  data: [],
  loading: false,
  error: false,
};

export const getPostsAsync = createAsyncThunk(
  'posts/getPosts',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      return { ...state, data: [] };
    },
  },
  extraReducers: builder => {
    builder.addCase(getPostsAsync.pending, state => {
      return { ...state, loading: false };
    });

    builder.addCase(getPostsAsync.fulfilled, (state, action) => {
      return {
        ...state,
        data: action.payload,
        loading: true,
      };
    });
    builder.addCase(getPostsAsync.rejected, state => {
      return {
        ...state,
        error: true,
        loading: true,
      };
    });
  },
});

export const postsSliceActions = postsSlice.actions;
export const selectPosts = (state: { posts: PostsState }) => state.posts.data;
export default postsSlice.reducer;
