/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';
import { User } from '../../types/User';

type PostsState = {
  items: Post[] | null;
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  items: null,
  loaded: true,
  hasError: false,
};

export const init = createAsyncThunk('posts/fetch', (user: User) => {
  return getUserPosts(user.id);
});

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(init.pending, state => {
        state.loaded = false;
        state.items = null;
        state.hasError = false;
      })
      .addCase(init.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(init.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export default postSlice.reducer;
