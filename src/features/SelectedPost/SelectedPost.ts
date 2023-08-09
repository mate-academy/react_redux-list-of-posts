/* eslint-disable no-param-reassign, @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type SelectedPost = {
  post: Post | null,
  loading: boolean,
  error: boolean,
};

const initialState: SelectedPost = {
  post: null,
  loading: false,
  error: false,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    add: (state: SelectedPost, action: PayloadAction<Post | null>) => {
      state.post = action.payload;
    },
    remove: (state: SelectedPost) => {
      state.post = null;
    },
  },
});

export const { add, remove } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
