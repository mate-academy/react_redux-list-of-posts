/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type InitialState = {
  selectedPost: Post | null;
};

const initialState: InitialState = {
  selectedPost: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    selectPost: (state, action) => {
      state.selectedPost = action.payload;
    },
    deselectPost: (state) => {
      state.selectedPost = null;
    },
  },
});

export const { selectPost, deselectPost } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
