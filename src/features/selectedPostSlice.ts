import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const initialState = null as Post | null;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    select: (_, action: PayloadAction<Post | null>) => {
      return action.payload;
    },
  },
});

export const { select } = selectedPostSlice.actions;
export const selectedPostReducer = selectedPostSlice.reducer;
