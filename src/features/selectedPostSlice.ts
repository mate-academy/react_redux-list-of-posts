import { Post } from '../types/Post';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  selectedPost: null as null | Post,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Post | null>) => {
      return { ...state, selectedPost: action.payload };
    },
  },
});
