/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export type SelectedPostState = {
  post: Post | null;
};

const initialState: SelectedPostState = {
  post: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    getSelectPost: (state, action: PayloadAction<Post>) => {
      state.post = action.payload as Post;
    },
    clearSelectedPost: state => {
      state.post = null;
    },
  },
});

export default selectedPostSlice.reducer;
export const { getSelectPost, clearSelectedPost } = selectedPostSlice.actions;
