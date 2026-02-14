/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../../types/Post';

export interface SetSelectedPost {
  isSelected: Post | null;
}

const initialState: SetSelectedPost = {
  isSelected: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    selectPost: (state, action: PayloadAction<Post | null>) => {
      state.isSelected = action.payload;
    },
  },
});

export default selectedPostSlice.reducer;

export const { selectPost } = selectedPostSlice.actions;
