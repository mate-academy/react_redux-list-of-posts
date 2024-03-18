/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export type SelectPost = {
  selectedPost: Post | null;
};

const initialState: SelectPost = {
  selectedPost: null,
};

const selectedPOstSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
  },
});

export default selectedPOstSlice.reducer;
export const { setSelectedPost } = selectedPOstSlice.actions;
