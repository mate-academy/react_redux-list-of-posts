/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

const initialState: { selectedPost: Post | null } = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'selecterPost',
  initialState,
  reducers: {
    set: (state, action) => {
      state.selectedPost = action.payload;
    },

    clear: (state) => {
      state.selectedPost = null;
    },
  },
});

export const { actions } = selectedPostSlice;
export default selectedPostSlice.reducer;
