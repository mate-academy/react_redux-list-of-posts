/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPost = {
  post: Post | null;
};

const initialState: SelectedPost = {
  post: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    select: (state, action: PayloadAction<Post | null>) => {
      state.post = action.payload;
    },

    remove: state => {
      state.post = null;
    },
  },
});

export default selectedPostSlice.reducer;
export const { select, remove } = selectedPostSlice.actions;
