/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPostState = {
  post: Post | null;
  loading: boolean;
  error: boolean;
};

const initialState: SelectedPostState = {
  post: null,
  loading: false,
  error: false,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Post>) => {
      state.post = action.payload;
    },
    clear(state) {
      state.post = null;
    },
  },
});

export const { actions } = selectedPostSlice;
export default selectedPostSlice.reducer;
