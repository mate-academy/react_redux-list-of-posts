/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export type SelectedPostState = {
  selectedPost: Post | null;
};

const initialState: SelectedPostState = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    selectedPostSet: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
});

export const { selectedPostSet } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
