/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
});

export default selectedPostSlice.reducer;
export const { setSelectedPost } = selectedPostSlice.actions;
