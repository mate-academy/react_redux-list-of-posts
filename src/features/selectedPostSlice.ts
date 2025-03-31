/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export interface SelectedPostState {
  post: Post | null;
}

const initialState: SelectedPostState = {
  post: null,
};

export const selectedPostSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    select: (state, action: PayloadAction<Post>) => {
      state.post = action.payload;
    },
    clear: state => {
      state.post = null;
    },
  },
});

export const { select } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
