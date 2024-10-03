/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPostState = {
  selectedPost: Post | null;
};
const initialState: SelectedPostState = {
  selectedPost: null,
};

const selectedSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post>) => {
      state.selectedPost = action.payload;
    },
    clearSelectedPost: state => {
      state.selectedPost = null;
    },
  },
});

export default selectedSlice.reducer;
export const { setSelectedPost, clearSelectedPost } = selectedSlice.actions;
