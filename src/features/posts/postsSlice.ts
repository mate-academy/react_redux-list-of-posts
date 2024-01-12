/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

export interface IInitialState {
  posts: Post[];
  isPostsLoaded: boolean;
  hasPostsError: boolean;
}

export const postsInit = createAsyncThunk('posts/fetch', (id: number) => {
  return getUserPosts(id);
});

const initialState: IInitialState = {
  posts: [],
  isPostsLoaded: false,
  hasPostsError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, actions) => {
      state.posts = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postsInit.pending, (state) => {
      state.isPostsLoaded = false;
    });

    builder.addCase(postsInit.fulfilled, (state, actions) => {
      state.posts = actions.payload;
      state.isPostsLoaded = true;
    });
  },
});

export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;
