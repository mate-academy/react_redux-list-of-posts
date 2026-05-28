import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const initialState = null as Post | null;

export const selectedPostReducer = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      return action.payload;
    },

    cleanSelectedPost: () => {
      return null;
    },
  },
});

export const { setSelectedPost, cleanSelectedPost } =
  selectedPostReducer.actions;
export default selectedPostReducer.reducer;
