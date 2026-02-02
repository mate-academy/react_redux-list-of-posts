// src/features/SelectedPostSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const initialState: Post | null = null;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (_state, action) => action.payload,
  },
});

export const { setSelectedPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
