import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const initialState = null as Post | null;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    set: (_, action: PayloadAction<typeof initialState>) => action.payload,
  },
});

export const { set } = selectedPostSlice.actions;
