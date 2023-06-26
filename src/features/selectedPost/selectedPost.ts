/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type SelectedPost = {
  selectedPost: Post | null;
};

const initialState: SelectedPost = {
  selectedPost: null,
};

const selectedPostSLice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    set: (state, actions: PayloadAction<Post | null>) => {
      state.selectedPost = actions.payload;
    },
  },
});

export default selectedPostSLice.reducer;
export const { set } = selectedPostSLice.actions;
