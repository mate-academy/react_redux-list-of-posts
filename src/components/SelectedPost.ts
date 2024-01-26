/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export interface InitialStoreSelectedPost {
  value: Post | null;
}

const initialState: InitialStoreSelectedPost = {
  value: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost  ',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Post | null>) => {
      state.value = action.payload;
    },
  },
});

export const { set } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
