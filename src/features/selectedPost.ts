/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type InitialState = {
  post: Post | null;
};

const initialState: InitialState = {
  post: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    selectPost(state, action: PayloadAction<Post | null>) {
      state.post = action.payload;
    },
  },
});

export const selectedPostReducer = selectedPostSlice.reducer;
export const { selectPost } = selectedPostSlice.actions;
