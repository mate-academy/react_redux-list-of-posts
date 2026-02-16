import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const initialState = null as Post | null;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (_state, action) => {
      return action.payload;
    },
  },
});

export const { setSelectedPost } = selectedPostSlice.actions;
