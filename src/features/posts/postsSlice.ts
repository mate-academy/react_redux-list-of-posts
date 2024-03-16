import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export interface PostsStateType {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsStateType = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const set = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: state => {
      return { ...state, posts: [] };
    },
  },
  extraReducers: builder => {
    builder.addCase(set.pending, state => {
      return { ...state, loaded: false };
    });

    builder.addCase(set.fulfilled, (state, action) => {
      return { ...state, posts: action.payload, loaded: true };
    });

    builder.addCase(set.rejected, state => {
      return { ...state, loaded: true, hasError: true };
    });
  },
});

export default postsSlice.reducer;
export const { clear } = postsSlice.actions;
