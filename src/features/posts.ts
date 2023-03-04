import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  posts: Post[],
  loading: boolean,
  error: string,
};

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });

    builder.addCase(init.fulfilled, (state, action) => {
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    });

    builder.addCase(init.rejected, (state) => {
      return {
        ...state,
        error: 'Error',
        loading: false,
      };
    });
  },
});

export default postsSlice.reducer;
export const { actions } = postsSlice;
