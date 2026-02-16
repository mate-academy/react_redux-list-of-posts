import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

const initialState = null as Post | null;

export const SelectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      return action.payload;
    },
  },
});

export const { setSelectedPost } = SelectedPostSlice.actions;
