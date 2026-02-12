/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const initialState: Post | null = null;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: initialState,
  reducers: {
    setPost: (_state, action) => action.payload,
  },
});

export const { setPost } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
