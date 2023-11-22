/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

export interface InitialState {
  selectedPost: Post | null;
}

const initialState: InitialState = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'selecterPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },

    clearSelectedPost: (state) => {
      state.selectedPost = null;
    },
  },
});

export const { actions } = selectedPostSlice;
export default selectedPostSlice.reducer;
