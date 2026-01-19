import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';
import { User } from '../types/User';
import { set } from './author';

/* eslint-disable no-param-reassign */

export interface InitialStateType {
  loaded: boolean;
  hasError: boolean;
  items: Post[];
}

const initialState: InitialStateType = {
  hasError: false,
  items: [],
  loaded: false,
};

export const loadUserPosts = createAsyncThunk(
  'posts/fetch',
  (id: User['id']) => {
    return getUserPosts(id);
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(set.type, state => {
      state.items = [];
      state.loaded = true;
      state.hasError = false;
    });

    builder.addCase(loadUserPosts.pending, state => {
      state.items = [];
      state.loaded = false;
    });

    builder.addCase(
      loadUserPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.items = action.payload;
        state.loaded = true;
      },
    );

    builder.addCase(loadUserPosts.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export default postsSlice.reducer;
