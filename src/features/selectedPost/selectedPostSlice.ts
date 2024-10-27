/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type InitialState = {
  selectedPost: Post | null;
};

const initialState: InitialState = {
  selectedPost: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    saveSelectedPost(state, action: PayloadAction<Post>) {
      state.selectedPost = action.payload;
    },

    clearSelectedPost(state) {
      state.selectedPost = null;
    },
  },
});

export const selectedPostReducer = selectedPostSlice.reducer;
export const { saveSelectedPost, clearSelectedPost } =
  selectedPostSlice.actions;
