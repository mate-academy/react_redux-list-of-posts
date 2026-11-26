import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const initialState: Post | null = null as Post | null;

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    selectPost: (_, action: PayloadAction<Post | null>) =>
      action.payload ?? null,
  },
});

export const selectedPostActions = postSlice.actions;
export const selectedPostReducer = postSlice.reducer;
