/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export interface SelectedPostState {
  selectedPost: Post | null;
}

const initialState: SelectedPostState = {
  selectedPost: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    choose: (state, action: PayloadAction<Post>) => {
      state.selectedPost = action.payload;
    },
    clear: (state) => {
      state.selectedPost = null;
    },
  },
});

export default selectedPostSlice.reducer;
export const { choose, clear } = selectedPostSlice.actions;
