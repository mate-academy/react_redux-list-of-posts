/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';
// eslint-disable-next-line import/no-cycle

export interface PostsState {
  userPost: Post | null;
}

const initialState: PostsState = {
  userPost: null,
};

export const init = createAsyncThunk(
  'posts/fetch', (userId: number) => {
    return getUserPosts(userId);
  },
);

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setPost: (state, action) => {
      state.userPost = action.payload;
    },
    resetPost: (state) => {
      state.userPost = null;
    },
  },
});

export const { setPost, resetPost } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
