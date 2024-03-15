/* eslint-disable no-param-reassign */
/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

interface SelectedPostSliceState {
  post: Post | null,
}

const initialState: SelectedPostSliceState = {
  post: null,
};

export const selectedPostSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPost: (state, action) => {
      state.post = action.payload;
    },
    clearPost: state => {
      state.post = null;
    },
  },
});

export const { setPost, clearPost } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
