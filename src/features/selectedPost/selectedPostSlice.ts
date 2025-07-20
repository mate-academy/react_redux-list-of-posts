import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

export type SelectedPostState = Post | null;

const initialState = null as Post | null;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (_, action: PayloadAction<Post | null>) => {
      return action.payload;
    },
    unselectPost: () => {
      return null;
    },
  },
});

export const { setSelectedPost, unselectPost } = selectedPostSlice.actions;
