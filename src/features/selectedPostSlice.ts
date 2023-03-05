/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export interface SelectedPostState {
  selectedPost: Post | null
}
const initialState:SelectedPostState = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Post>) => {
      state.selectedPost = action.payload;
    },
    clearSelectedPost: (state) => {
      state.selectedPost = null;
    },
  },
});

export const { setPost, clearSelectedPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
