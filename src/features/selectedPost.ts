/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPostState = {
  selectedPost: Post | null;
};

const initialState: SelectedPostState = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
    resetSelectedPost: (state) => {
      state.selectedPost = null;
    },
  },
});

export const { setSelectedPost, resetSelectedPost } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
