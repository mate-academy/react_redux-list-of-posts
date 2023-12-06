/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

export interface PostsState {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const LoadPosts = createAsyncThunk<Post[], number>(
  'posts/fetchLoad',
  (userId: number) => getUserPosts(userId),
);

const userPostsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: (state) => {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(LoadPosts.pending, (state) => {
      state.hasError = false;
      state.loaded = false;
    });

    builder.addCase(
      LoadPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.posts = action.payload;
        state.loaded = true;
      },
    );

    builder.addCase(LoadPosts.rejected, (state) => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export default userPostsSlice.reducer;
export const { clear } = userPostsSlice.actions;
