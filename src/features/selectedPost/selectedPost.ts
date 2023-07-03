/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type SelectedPost = {
  post: Post | null,
  isSelected: boolean,
};

const initialState: SelectedPost = {
  post: null,
  isSelected: false,
};

const selectedPostSlice = createSlice({
  name: 'selectedSlice',
  initialState,
  reducers: {
    select: (state: SelectedPost, action: PayloadAction<Post>) => {
      state.post = action.payload;
      state.isSelected = true;
    },

    clear: (state: SelectedPost) => {
      state.post = null;
      state.isSelected = false;
    },
  },
});

export default selectedPostSlice.reducer;
export const { select, clear } = selectedPostSlice.actions;
