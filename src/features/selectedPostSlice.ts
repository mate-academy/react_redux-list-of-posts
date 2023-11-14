/* eslint no-param-reassign: "error" */
import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPostState = {
  selectedPost: Post | null,
};

const initialState: SelectedPostState = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },

    resetSelectedPost: (state) => {
      state.selectedPost = null;
    },
  },
});

export const { setSelectedPost, resetSelectedPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
