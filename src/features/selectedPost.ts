import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const initialState = null as Post | null;

export const selectedPostSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    getPost: (state, action: PayloadAction<Post>) => {
      if (state?.id === action.payload.id) {
        return null;
      } else {
        return action.payload;
      }
    },
    cleanPost: () => {
      return null;
    },
  },
});

export const { getPost, cleanPost } = selectedPostSlice.actions;
