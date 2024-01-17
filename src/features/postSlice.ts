/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPost = {
  selectedPost: Post | null;
};

const initialState: SelectedPost = {
  selectedPost: null,
};

const postSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
});

export const { set } = postSlice.actions;
export default postSlice.reducer;
