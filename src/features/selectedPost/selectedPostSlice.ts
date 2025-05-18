/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { Post } from '../../types/Post';

type SelectedPostState = {
  selectedPost: Post | null;
};

const initialState: SelectedPostState = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setPost(state, action) {
      state.selectedPost = action.payload;
    },
    removePost(state) {
      state.selectedPost = null;
    },
  },
});

export const selectedPostReducer = selectedPostSlice.reducer;
export const selectedPostActions = selectedPostSlice.actions;
