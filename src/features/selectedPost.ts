import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

/* eslint-disable no-param-reassign */
export interface SelectedPostState {
  item: Post | null;
  loaded: boolean;
  hasError: boolean;
}

const initialState: SelectedPostState = {
  item: null,
  loaded: false,
  hasError: false,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    selectPost(state, action) {
      state.item = state.item?.id === action.payload.id ? null : action.payload;
    },
    clearSelectedPost(state) {
      state.item = null;
    },
  },
});

export const { selectPost, clearSelectedPost } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
