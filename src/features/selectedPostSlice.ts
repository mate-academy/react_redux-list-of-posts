import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: null as Post | null,
  reducers: {
    setSelectedPost: (_selectedPost, action) => action.payload,
  },
});

export const selectedPostReducer = selectedPostSlice.reducer;
export const { setSelectedPost } = selectedPostSlice.actions;
