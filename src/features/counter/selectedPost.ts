import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

const initialState = null as Post | null;

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setPost: (_, action: PayloadAction<Post | null>) => {
      return action.payload;
    },

    closePost: () => {
      return null;
    },
  },
});

export const selectedPostReducer = selectedPostSlice.reducer;
export const { setPost, closePost } = selectedPostSlice.actions;
