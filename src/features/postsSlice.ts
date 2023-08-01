import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
  error: string;
  setSelectedPost: Post | null;
};

const initialState: PostsState = {
  posts: [],
  loaded: false,
  hasError: false,
  error: '',
  setSelectedPost: null,
};

export const init = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      return {
        ...state,
        posts: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      return {
        ...state,
        loaded: true,
      };
    });
    builder.addCase(init.fulfilled, (state, action) => {
      return {
        ...state,
        loaded: false,
        posts: action.payload,
      };
    });
    builder.addCase(init.rejected, (state) => {
      return {
        ...state,
        loaded: false,
        hasError: true,
        error: 'Something went wrong',
      };
    });
  },
});

export const { actions } = postsSlice;
export default postsSlice.reducer;
