/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export interface SelectedPostSliceState {
  selectedPost: Post | null;
}

const initialState: SelectedPostSliceState = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
    removeSelectedPost: (state) => {
      state.selectedPost = null;
    },
  },
});

export const {
  setSelectedPost, removeSelectedPost,
} = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
