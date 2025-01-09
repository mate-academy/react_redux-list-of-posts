/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface PostsState {
  items: Post[];
  loaded: boolean;
  error: boolean;
}

const initialState: PostsState = {
  items: [],
  loaded: false,
  error: false,
};

export const fetchUserPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  (userId: number) => {
    return getUserPosts(userId);
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: state => {
      state.items = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUserPosts.pending, state => {
      state.loaded = false;
      state.error = false;
    });

    builder.addCase(
      fetchUserPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.items = action.payload;
        state.loaded = true;
      },
    );

    builder.addCase(fetchUserPosts.rejected, state => {
      state.error = true;
      state.loaded = true;
    });
  },
});

export const { clear } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
