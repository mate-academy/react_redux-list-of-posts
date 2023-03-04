/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export interface PostsState {
  selectedPost: Post | null;
}

const initialState: PostsState = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setPost(state, action: PayloadAction<Post>) {
      state.selectedPost = action.payload;
    },
    clearPost(state) {
      state.selectedPost = null;
    },
  },
});

export const { setPost, clearPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
