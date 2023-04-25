/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export interface SelectedPost {
  item: Post | null;
}

const initialState: SelectedPost = {
  item: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.item = action.payload;
    },

    removePost: (state) => {
      state.item = null;
    },
  },
});

export const { addPost, removePost } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
