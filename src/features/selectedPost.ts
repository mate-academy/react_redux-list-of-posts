/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type State = {
  selectedPost: Post | null,
};

const initialState: State = {
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
