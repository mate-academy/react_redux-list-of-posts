/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type State = {
  selectedPost: null | Post;
};

const initialState: State = {
  selectedPost: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    resetSelectedPost: state => {
      state.selectedPost = null;
    },
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
  },
});

export default selectedPostSlice.reducer;

export const { resetSelectedPost, setSelectedPost } = selectedPostSlice.actions;
