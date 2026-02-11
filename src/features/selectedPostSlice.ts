import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const initialState = null as Post | null;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: initialState,
  reducers: {
    selectPost: (_, action: PayloadAction<Post | null>) => {
      return action.payload;
    },
    unselectPost: () => {
      return null;
    },
  },
});

export const { selectPost, unselectPost } = selectedPostSlice.actions;
