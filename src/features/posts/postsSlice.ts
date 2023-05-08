/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from './postsAPI';

export interface PostsState {
  items: Post[];
  loaded: boolean,
  hasError: boolean,
}

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const getPostsOfUser = createAsyncThunk(
  'postsOfUser/fetch',
  async (userId: number) => {
    const userPosts = await getUserPosts(userId);

    return userPosts;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPostsOfUser.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(getPostsOfUser.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });

    builder.addCase(getPostsOfUser.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
