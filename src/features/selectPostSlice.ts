/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export interface SelectPostState {
  selectedPost: Post | null;
}

const initialState: SelectPostState = {
  selectedPost: null,
};

export const selectPostSlice = createSlice({
  name: 'selectPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
});

export const { setSelectedPost } = selectPostSlice.actions;

export default selectPostSlice.reducer;
