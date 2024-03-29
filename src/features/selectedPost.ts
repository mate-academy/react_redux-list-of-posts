/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type InitialState = {
  selectedPost: Post | null;
};

const initislSelectedPostState: InitialState = {
  selectedPost: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: initislSelectedPostState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post>) => {
      state.selectedPost = action.payload;
    },
    removeSelectedPost: state => {
      state.selectedPost = null;
    },
  },
});

export const { setSelectedPost, removeSelectedPost } =
  selectedPostSlice.actions;
export default selectedPostSlice.reducer;
