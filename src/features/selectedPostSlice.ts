import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export const selectedPostSlice = createSlice({
  name: 'author',
  initialState: {
    selectedPost: null as Post | null,
  },
  reducers: {
    setSelectedPost(state, action: PayloadAction<Post | null>) {
      return { ...state, selectedPost: action.payload };
    },
  },
});

export const { setSelectedPost } = selectedPostSlice.actions;
export const selectedPostReducer = selectedPostSlice.reducer;
