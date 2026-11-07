/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../../types/Post';

export interface State {
  postSelected: Post | null;
}

const initialState: State = {
  postSelected: null as Post | null,
};

export const selectedPostSlice = createSlice({
  name: 'post/set',
  initialState,
  reducers: {
    addPost(state, { payload }: PayloadAction<Post>) {
      state.postSelected = payload;
    },
    clearSelectedPost(state) {
      state.postSelected = null;
    },
  },
});

export const { clearSelectedPost } = selectedPostSlice.actions;
export const { addPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
