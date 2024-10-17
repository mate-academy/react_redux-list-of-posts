/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPost = {
  post: Post | null;
};

const initialState: SelectedPost = { post: null };

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setCurrentPost: (
      state: SelectedPost,
      action: PayloadAction<Post | null>,
    ) => {
      state.post = action.payload;
    },
    resetCurrentPost: state => {
      state.post = null;
    },
  },
});

export const { setCurrentPost, resetCurrentPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
