/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

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

export const getUserPostsFromServer = createAsyncThunk(
  'posts/getUserPosts',
  async (userId: number) => {
    const response = await getUserPosts(userId);

    return response;
  },
);

const PostsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUserPostsFromServer.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(getUserPostsFromServer.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });

    builder.addCase(getUserPostsFromServer.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
      state.hasError = false;
    });
  },
});

export default PostsSlice.reducer;
