/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPostState = {
  selectedPost: Post | null;
};

const initialState: SelectedPostState = {
  selectedPost: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Post>) => {
      state.selectedPost = action.payload;
    },
    clear: state => {
      state.selectedPost = null;
    },
  },
});

export default selectedPostSlice.reducer;
export const { set, clear } = selectedPostSlice.actions;
/* eslint-enable no-param-reassign */
