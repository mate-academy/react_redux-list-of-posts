import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const initialState: Post | null = null;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    set: (_state, action) => {
      return action.payload;
    },
  },
});

export const { set } = selectedPostSlice.actions;
