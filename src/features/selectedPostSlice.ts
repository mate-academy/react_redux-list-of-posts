/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export interface SelectedPostState {
  selectedPost: Post | null;
}

const initialState: SelectedPostState = {
  selectedPost: null,
};

export const authorSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setPost: (state, action) => {
      state.selectedPost = action.payload;
    },

    removePost: (state) => {
      state.selectedPost = null;
    },
  },
});

export const {
  setPost,
  removePost,
} = authorSlice.actions;

export default authorSlice.reducer;
