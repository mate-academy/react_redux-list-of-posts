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
      action: PayloadAction<Post>,
    ) => {
      state.selectedPost = action.payload;
    },

    removeSelectedPost: (state: SelectedPostState) => {
      state.selectedPost = null;
    },
  },
});

export const {
  setSelectedPost,
  removeSelectedPost,
} = selectedPostSlice.actions;
