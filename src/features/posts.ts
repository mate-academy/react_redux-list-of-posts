import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

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

export const init = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: (state) => {
      return {
        ...state,
        items: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      return { ...state, loaded: false };
    });

    builder.addCase(init.fulfilled, (state, action) => {
      return { ...state, loaded: true, items: action.payload };
    });

    builder.addCase(init.rejected, (state) => {
      return { ...state, loaded: true, hasError: true };
    });
  },
});

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
