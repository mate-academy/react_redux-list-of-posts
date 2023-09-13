/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const initialState = {
  selectedPost: null as Post | null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    choosePost: (selectedPost, action: PayloadAction<Post>) => {
      selectedPost.selectedPost = action.payload;
    },
    removePost: selectedPost => {
      selectedPost.selectedPost = null;
    },
  },
});

export default selectedPostSlice.reducer;
export const { actions } = selectedPostSlice;
