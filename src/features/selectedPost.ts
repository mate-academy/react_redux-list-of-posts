/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export interface SelectedPostSlice {
  selectedPost: Post | null,
}

const initialState: SelectedPostSlice = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectPost(state, action: PayloadAction<Post | null>) {
      state.selectedPost = action.payload;
    },

    resetSelectedPost(state) {
      state.selectedPost = null;
    },
  },
});

export const { setSelectPost, resetSelectedPost } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
