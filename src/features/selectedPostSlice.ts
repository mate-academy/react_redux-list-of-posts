/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { authorSlice } from './authorSlice';

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
    setSelectedPost(state, action) {
      state.selectedPost = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(authorSlice.actions.setAuthor, state => {
      state.selectedPost = null;
    });
  },
});

export default selectedPostSlice.reducer;
export const { setSelectedPost } = selectedPostSlice.actions;
