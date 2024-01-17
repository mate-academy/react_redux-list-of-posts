/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const initialState: { selectedPost?: Post } = {
  selectedPost: undefined,
};

export const selectedPostSlice = createSlice({
  name: 'authorSlice',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | undefined>) => {
      state.selectedPost = action.payload;
    },
  },
});

export default selectedPostSlice.reducer;
export const { setSelectedPost } = selectedPostSlice.actions;
