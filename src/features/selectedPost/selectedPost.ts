import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

const initialState = null as Post | null;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setPost: (_, action: PayloadAction<Post | null>) => {
      return action.payload;
    },
    removePost: () => {
      return null;
    },
  },
});

export const { removePost, setPost } = selectedPostSlice.actions;
export const selectedPostReducer = selectedPostSlice.reducer;
