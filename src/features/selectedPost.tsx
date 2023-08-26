/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export interface SelectedPostState {
  selectedPost: Post | null;
}

const initialState: SelectedPostState = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setSelectedPost: (
      state: SelectedPostState,
      action: PayloadAction<Post | null>,
    ) => {
      state.selectedPost = action.payload;
    },

    clearSelectedPost: (state) => {
      state.selectedPost = null;
    },
  },
});

export const { setSelectedPost, clearSelectedPost } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
