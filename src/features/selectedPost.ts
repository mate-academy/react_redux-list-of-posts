/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { Post } from '../types/Post';

export interface PostState {
  selectedPost: Post | null,
}

const initialState: PostState = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Post>) => {
      state.selectedPost = action.payload;
    },
    clear: (state) => {
      state.selectedPost = null;
    },
  },
});

export const { set, clear } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
