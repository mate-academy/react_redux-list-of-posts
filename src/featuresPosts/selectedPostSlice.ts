import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
/* eslint-disable no-param-reassign */

export interface SelectedPostState {
  selectedPost: Post | null,
}

const initialState: SelectedPostState = {
  selectedPost: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    add: (state, action) => {
      state.selectedPost = action.payload;
    },
    clear: (state) => {
      state.selectedPost = null;
    },
  },
});

export const { add, clear } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
