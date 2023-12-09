import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  items: Post[],
  loaded: boolean,
  hasError: boolean,
};

const postsState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const postInit = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: postsState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(postInit.pending, (state) => {
      return {
        ...state,
        loaded: false,
      };
    });

    builder.addCase(postInit.fulfilled, (state, action) => {
      return {
        ...state,
        loaded: true,
        items: action.payload,
      };
    });

    builder.addCase(postInit.rejected, (state) => {
      return {
        ...state,
        hasError: true,
      };
    });
  },
});

export default postsSlice.reducer;
