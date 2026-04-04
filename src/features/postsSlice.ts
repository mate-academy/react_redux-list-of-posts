import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getPosts, getUserPosts } from '../api/posts';

type PostsState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  items: [],
  loaded: true,
  hasError: false,
};

export const postsInit = createAsyncThunk('posts/fetch', () => {
  return getPosts();
});

export const userPostsInit = createAsyncThunk(
  'posts/fetchByUser',
  (userId: number) => {
    return getUserPosts(userId);
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(postsInit.pending, state => {
      return {
        ...state,
        loaded: false,
      };
    });
    builder.addCase(postsInit.fulfilled, (state, action) => {
      return {
        ...state,
        items: action.payload,
        loaded: true,
      };
    });
    builder.addCase(postsInit.rejected, state => {
      return {
        ...state,
        hasError: true,
        loaded: true,
      };
    });
    builder.addCase(userPostsInit.pending, state => {
      return {
        ...state,
        loaded: false,
      };
    });
    builder.addCase(userPostsInit.fulfilled, (state, action) => {
      return {
        ...state,
        items: action.payload,
        loaded: true,
      };
    });
    builder.addCase(userPostsInit.rejected, state => {
      return {
        ...state,
        hasError: true,
        loaded: true,
      };
    });
  },
});

export default postsSlice.reducer;
