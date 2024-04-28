import { createSlice } from '@reduxjs/toolkit';
import type { Post } from '../types/Post';

export interface SelectedPostState {
  selectedPost: Post | null;
}

const initialState: SelectedPostState = {
  selectedPost: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: initialState,
  reducers: {
    set: (state, action) => {
      state.selectedPost = action.payload;
    },
    clear: state => {
      state.selectedPost = null;
    },
  },
});

export default selectedPostSlice.reducer;

export const { set, clear } = selectedPostSlice.actions;
