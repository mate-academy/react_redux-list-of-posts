import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: null as Post | null,
  reducers: {
    set: (_state, action: PayloadAction<Post | null>) => action.payload,
  },
});

export const { set } = selectedPostSlice.actions;
