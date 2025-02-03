import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const initialState = null as Post | null;

export const selectedPostSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    getPost: (state, acton: PayloadAction<Post>) => {
      if (state?.id === acton.payload.id) {
        return null;
      } else {
        return acton.payload;
      }
    },
    cleanPost: state => {
      return null;
    },
  },
});

export const { getPost, cleanPost } = selectedPostSlice.actions;
