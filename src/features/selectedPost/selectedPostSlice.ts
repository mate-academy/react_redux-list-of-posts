/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

export type TSelectedPostSlice = {
  selectedPost: Post | null;
};

const initialState: TSelectedPostSlice = {
  selectedPost: null,
};

const selectedPostSliceSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setPost: (state, actions) => {
      state.selectedPost = actions.payload;
    },
  },
});

export const { setPost } = selectedPostSliceSlice.actions;

export default selectedPostSliceSlice.reducer;
