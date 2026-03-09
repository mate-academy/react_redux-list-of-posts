import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
/* eslint-disable no-param-reassign */

type InitialState = {
  selectedPost: Post | null;
};

const initialState: InitialState = { selectedPost: null };

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    select: (state, action: PayloadAction<Post>) => {
      state.selectedPost = action.payload;
    },

    clear: state => {
      state.selectedPost = null;
    },
  },
});

export default selectedPostSlice.reducer;

export const { select, clear } = selectedPostSlice.actions;
