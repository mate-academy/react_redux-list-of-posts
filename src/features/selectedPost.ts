/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export interface SelectedPostSliceIS {
  selectedPost: Post | null,
}

const initialState: SelectedPostSliceIS = {
  selectedPost: null,
};

const selectedPost = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setPost: (state, action) => {
      state.selectedPost = action.payload;
    },
    clearPost: (state) => {
      state.selectedPost = null;
    },
  },
});

export default selectedPost.reducer;
export const { setPost, clearPost } = selectedPost.actions;
