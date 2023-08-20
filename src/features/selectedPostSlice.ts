/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export type PostState = {
  selectedPost: Post | null;
};

const initialState: PostState = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    set: (state, action) => {
      state.selectedPost = action.payload;
    },

    clear: (state) => {
      state.selectedPost = null;
    },
  },
});

export const { set, clear } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
