/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type SelectedPostState = {
  selectedPost: Post | null,
};

const initialState: SelectedPostState = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    set: (state, action) => {
      state.selectedPost = action.payload;
    },
  },
});

export const { set } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
