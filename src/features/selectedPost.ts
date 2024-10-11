import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const initialState = null as Post | null;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (_, actions) => actions.payload,
  },
});

export const selectedPostReducer = selectedPostSlice.reducer;
