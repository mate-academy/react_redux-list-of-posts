import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPostState = Post | null;

const initialState: SelectedPostState = null;

export const selectedPostSlice: Slice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (_, action: PayloadAction) => {
      return action.payload;
    },
    removeSelectedPost: () => {
      return null;
    },
  },
});

export const { setSelectedPost, removeSelectedPost } =
  selectedPostSlice.actions;
