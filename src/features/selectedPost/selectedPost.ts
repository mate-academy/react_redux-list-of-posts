/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

export interface InitialState {
  selectedPost: Post | null;
}

const initialState: InitialState = {
  selectedPost: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    selectPost: (state, action: PayloadAction<Post>) => {
      state.selectedPost = action.payload;
    },

    deselectPost: (state) => {
      state.selectedPost = null;
    },
  },
});

export default selectedPostSlice.reducer;
export const { selectPost, deselectPost } = selectedPostSlice.actions;
