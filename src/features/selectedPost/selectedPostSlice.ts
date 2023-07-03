/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type SelectedPost = {
  post: Post | null;
  selected: boolean;
};

const initialState: SelectedPost = {
  post: null,
  selected: false,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    select: (state: SelectedPost, action: PayloadAction<Post>) => {
      state.post = action.payload;
      state.selected = true;
    },
    clear: (state: SelectedPost) => {
      state.post = null;
      state.selected = false;
    },
  },
});

export const { select, clear } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
