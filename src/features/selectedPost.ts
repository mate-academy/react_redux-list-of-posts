import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const initialState: Post | null = null as Post | null;

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    selectPost: (
      selectedPost: Post | null = initialState,
      action: PayloadAction<Post | null>,
    ) => (selectedPost = action.payload ?? null),
  },
});

export const selectedPostActions = postSlice.actions;
export const selectedPostReducer = postSlice.reducer;
