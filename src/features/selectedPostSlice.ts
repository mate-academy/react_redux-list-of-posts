/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export interface SelectedPost {
  selectedPost: Post | null;
}

const initialState: SelectedPost = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
    clear: state => {
      state.selectedPost = null;
    },
  },
});

export const { set, clear } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
