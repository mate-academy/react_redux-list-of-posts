import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const initialState: Post | null = null as Post | null;

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    selectPost: (
      post: Post | null = initialState,
      action: PayloadAction<Post | null>,
    ) => (post = action.payload ?? null),
  },
});

export const postActions = postSlice.actions;
export const postReducer = postSlice.reducer;
