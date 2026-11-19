// src/features/selectedPostSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPostState = Post | null;

const initialState = null as SelectedPostState;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (_, action: PayloadAction<Post | null>) => action.payload,
  },
});

export const { setSelectedPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
