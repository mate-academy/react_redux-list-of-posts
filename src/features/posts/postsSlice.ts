import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from './postsApi';

type PostsState = {
  posts: Post[]
  loaded: boolean,
  hasError: boolean
};

const initialState: PostsState = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const init = createAsyncThunk('posts/fetch', (id: number) => {
  return getUserPosts(id);
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => ({
      ...state,
      posts: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => ({
      ...state,
      loaded: false,
      hasError: false,
    }));

    builder.addCase(init.fulfilled, (state, action) => ({
      ...state,
      posts: action.payload,
      loaded: true,
    }));

    builder.addCase(init.rejected, (state) => ({
      ...state,
      hasError: true,
      loaded: true,
    }));
  },
});

export default postsSlice.reducer;
export const { setPosts } = postsSlice.actions;
